export enum PossibleRolesEn {
  admin = "admin",
  user = "user",
}

export enum PossibleRolesPt {
  admin = "Administrador",
  user = "Usuário",
}

export function rolePtToEn(role: PossibleRolesPt): PossibleRolesEn {
  switch (role) {
    case PossibleRolesPt.admin:
      return PossibleRolesEn.admin;
    case PossibleRolesPt.user:
      return PossibleRolesEn.user;
  }
}

export function roleEnToPt(role: PossibleRolesEn): PossibleRolesPt {
  switch (role) {
    case PossibleRolesEn.admin:
      return PossibleRolesPt.admin;
    case PossibleRolesEn.user:
      return PossibleRolesPt.user;
  }
}
