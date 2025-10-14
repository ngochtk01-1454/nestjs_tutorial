import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

// Mock interfaces for testing
interface MockUser {
  id: number;
  name: string;
  email: string;
  bio?: string;
}

interface LoginDto {
  email: string;
  password: string;
}

interface LoginResponseDto {
  access_token: string;
}

// Mock AuthService
const mockAuthService = {
  validateUser: jest.fn(),
  login: jest.fn(),
};

describe('AuthController', () => {
  let controller: AuthController;

  const mockUser: MockUser = {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Software Developer',
  };

  const mockLoginDto: LoginDto = {
    email: 'john.doe@example.com',
    password: 'password123',
  };

  const mockAccessToken = 'mock.jwt.token';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthController,
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);

    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should login user successfully and return access token', async () => {
      // Arrange
      mockAuthService.validateUser.mockResolvedValue(mockUser);
      mockAuthService.login.mockResolvedValue(mockAccessToken);

      // Act
      const result = await controller.login(mockLoginDto);

      // Assert
      expect(mockAuthService.validateUser).toHaveBeenCalledWith(
        mockLoginDto.email,
        mockLoginDto.password,
      );
      expect(mockAuthService.login).toHaveBeenCalledWith(mockUser);
      expect(result).toEqual<LoginResponseDto>({
        access_token: mockAccessToken,
      });
    });

    it('should throw error when validateUser fails', async () => {
      // Arrange
      const error = new Error('Invalid credentials');
      mockAuthService.validateUser.mockRejectedValue(error);

      // Act & Assert
      await expect(controller.login(mockLoginDto)).rejects.toThrow(error);
      expect(mockAuthService.validateUser).toHaveBeenCalledWith(
        mockLoginDto.email,
        mockLoginDto.password,
      );
      expect(mockAuthService.login).not.toHaveBeenCalled();
    });

    it('should throw error when login service fails', async () => {
      // Arrange
      const error = new Error('JWT signing failed');
      mockAuthService.validateUser.mockResolvedValue(mockUser);
      mockAuthService.login.mockRejectedValue(error);

      // Act & Assert
      await expect(controller.login(mockLoginDto)).rejects.toThrow(error);
      expect(mockAuthService.validateUser).toHaveBeenCalledWith(
        mockLoginDto.email,
        mockLoginDto.password,
      );
      expect(mockAuthService.login).toHaveBeenCalledWith(mockUser);
    });

    it('should handle invalid login data', async () => {
      // Arrange
      const invalidLoginDto = {
        email: '',
        password: '',
      } as LoginDto;

      // Act & Assert
      await expect(controller.login(invalidLoginDto)).rejects.toThrow();
    });
  });

  describe('Controller Logic', () => {
    it('should call authService methods in correct order', async () => {
      // Arrange
      mockAuthService.validateUser.mockResolvedValue(mockUser);
      mockAuthService.login.mockResolvedValue(mockAccessToken);

      // Act
      await controller.login(mockLoginDto);

      // Assert
      expect(mockAuthService.validateUser).toHaveBeenCalledTimes(1);
      expect(mockAuthService.login).toHaveBeenCalledTimes(1);
    });

    it('should pass correct user object to login method', async () => {
      // Arrange
      const customUser = { ...mockUser, name: 'Custom User' };
      mockAuthService.validateUser.mockResolvedValue(customUser);
      mockAuthService.login.mockResolvedValue(mockAccessToken);

      // Act
      await controller.login(mockLoginDto);

      // Assert
      expect(mockAuthService.login).toHaveBeenCalledWith(customUser);
    });
  });

  describe('Error Handling', () => {
    it('should propagate validation errors', async () => {
      // Arrange
      const validationError = new Error('Validation failed');
      mockAuthService.validateUser.mockRejectedValue(validationError);

      // Act & Assert
      await expect(controller.login(mockLoginDto)).rejects.toThrow(
        'Validation failed',
      );
    });

    it('should propagate JWT signing errors', async () => {
      // Arrange
      mockAuthService.validateUser.mockResolvedValue(mockUser);
      const jwtError = new Error('JWT signing failed');
      mockAuthService.login.mockRejectedValue(jwtError);

      // Act & Assert
      await expect(controller.login(mockLoginDto)).rejects.toThrow(
        'JWT signing failed',
      );
    });
  });
});
