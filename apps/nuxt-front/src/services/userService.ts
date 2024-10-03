export class UserService {
  // could be the place where you'd typically check against a database
  getRolePermission(email: string) {
    // validate user role and return permissions
    return {
      user: ['readSpecialPage'],
    };
  }

  getUserId(email: string) {
    // validate user role and return permissions
    return '123';
  }
}
