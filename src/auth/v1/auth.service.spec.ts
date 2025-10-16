import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/v1/users.service';

// Mock bcrypt
jest.mock('bcrypt');
const mockedBcrypt = bcrypt as jest.Mocked<typeof bcrypt>;

// Mock User interface for testing
interface MockUser {
  id: number;
  name: string;
  email: string;
  password: string;
  bio?: string;
}

// Mock UsersService
const mockUsersService = {
  findByEmail: jest.fn(),
};

// Mock JwtService
const mockJwtService = {
  sign: jest.fn(),
};

const mockUser = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@example.com',
  password: '$2b$10$hashedPassword',
  bio: 'Software Developer',
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);

    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    const email = 'john.doe@example.com';
    const password = 'password123';

    it('should validate user successfully with correct credentials', async () => {
      // Arrange
      mockUsersService.findByEmail.mockResolvedValue(mockUser);
      mockedBcrypt.compare.mockResolvedValue(true as never);

      // Act
      const result = await service.validateUser(email, password);

      // Assert
      expect(mockUsersService.findByEmail).toHaveBeenCalledWith(email);
      expect(mockedBcrypt.compare).toHaveBeenCalledWith(
        password,
        mockUser.password,
      );
      expect(result).toEqual({
        id: mockUser.id,
        name: mockUser.name,
        email: mockUser.email,
        bio: mockUser.bio,
      });
    });

    it('should throw UnauthorizedException when user not found', async () => {
      // Arrange
      mockUsersService.findByEmail.mockResolvedValue(null);

      // Act & Assert
      await expect(service.validateUser(email, password)).rejects.toThrow(
        UnauthorizedException,
      );
      expect(mockUsersService.findByEmail).toHaveBeenCalledWith(email);
      expect(mockedBcrypt.compare).not.toHaveBeenCalled();
    });

    it('should throw UnauthorizedException when password is incorrect', async () => {
      // Arrange
      mockUsersService.findByEmail.mockResolvedValue(mockUser);
      mockedBcrypt.compare.mockResolvedValue(false as never);

      // Act & Assert
      await expect(service.validateUser(email, password)).rejects.toThrow(
        UnauthorizedException,
      );
      expect(mockUsersService.findByEmail).toHaveBeenCalledWith(email);
      expect(mockedBcrypt.compare).toHaveBeenCalledWith(
        password,
        mockUser.password,
      );
    });

    it('should handle database errors gracefully', async () => {
      // Arrange
      const dbError = new Error('Database connection failed');
      mockUsersService.findByEmail.mockRejectedValue(dbError);

      // Act & Assert
      await expect(service.validateUser(email, password)).rejects.toThrow(
        dbError,
      );
      expect(mockUsersService.findByEmail).toHaveBeenCalledWith(email);
    });

    it('should handle bcrypt errors gracefully', async () => {
      // Arrange
      mockUsersService.findByEmail.mockResolvedValue(mockUser);
      const bcryptError = new Error('Bcrypt comparison failed');
      mockedBcrypt.compare.mockRejectedValue(bcryptError as never);

      // Act & Assert
      await expect(service.validateUser(email, password)).rejects.toThrow(
        bcryptError,
      );
    });
  });

  describe('login', () => {
    const userPayload = {
      id: mockUser.id,
      name: mockUser.name,
      email: mockUser.email,
      bio: mockUser.bio,
    };

    it('should generate access token successfully', async () => {
      // Arrange
      const expectedToken = 'jwt.access.token';
      mockJwtService.sign.mockReturnValue(expectedToken);

      // Act
      const result = await service.login(userPayload);

      // Assert
      expect(mockJwtService.sign).toHaveBeenCalledWith({
        email: userPayload.email,
        userId: userPayload.id,
      });
      expect(result).toBe(expectedToken);
    });

    it('should handle JWT signing errors', async () => {
      // Arrange
      const jwtError = new Error('JWT signing failed');
      mockJwtService.sign.mockImplementation(() => {
        throw jwtError;
      });

      // Act & Assert
      await expect(service.login(userPayload)).rejects.toThrow(jwtError);
      expect(mockJwtService.sign).toHaveBeenCalledWith({
        email: userPayload.email,
        userId: userPayload.id,
      });
    });

    it('should create correct JWT payload', async () => {
      // Arrange
      const expectedToken = 'jwt.access.token';
      mockJwtService.sign.mockReturnValue(expectedToken);

      // Act
      await service.login(userPayload);

      // Assert
      expect(mockJwtService.sign).toHaveBeenCalledWith(
        expect.objectContaining({
          email: userPayload.email,
          userId: userPayload.id,
        }),
      );
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty email in validateUser', async () => {
      // Arrange
      mockUsersService.findByEmail.mockResolvedValue(null);

      // Act & Assert
      await expect(service.validateUser('', 'password')).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
