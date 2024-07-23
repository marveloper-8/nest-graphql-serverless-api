import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { JwtService } from '@nestjs/jwt'
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
      const ctx = GqlExecutionContext.create(context)
      const { req } = ctx.getContext();

      if (!req.headers.authorization) {
        return false;
      }

      const token = req.headers.authorization.split(' ')[1];
      try {
        const decoded = this.jwtService.verify(token);
        req.user = decoded;
        return true;
      } catch (err) {
        return false;
      }
  }
}