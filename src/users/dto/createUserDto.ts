export class CreateUserDto {
    readonly email: string;
    readonly name: string;
    readonly surname: string;
    readonly nickname: string;
    readonly dateOfBirth: string;
    readonly password: string;
    readonly refCode?: string;
    readonly status?: string;
}