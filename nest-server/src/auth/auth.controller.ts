import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UserDTO } from 'src/user/dtos/user.dto';
import { UserDetails } from 'src/user/user-details.interface';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor (private authService: AuthService) {}

    @Post('register')
        register(@Body() user: UserDTO): Promise<UserDetails | null> {
            return this.authService.register(user);
        }
    @Post('login')
    @HttpCode(HttpStatus.OK)
    login(@Body() user: UserDTO): Promise<{token: string} | null> {
            return this.authService.login(user);
        }

    @Post('verify-jwt')
    @HttpCode(HttpStatus.OK)
    verifyJwt(@Body() payload: {jwt: string}) {
        return this.authService.verifyJwt(payload.jwt);
    }

}
