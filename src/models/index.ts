import { BelongsToManyOptions } from 'sequelize';

export const setupAssociations = () => {
  // User n-n Role
  // const userRoleAssociationOptions: BelongsToManyOptions = {
  //   through: 'user_role',
  //   timestamps: true,
  // };
  // UserModel.belongsToMany(RoleModel, userRoleAssociationOptions);
  // RoleModel.belongsToMany(UserModel, userRoleAssociationOptions);
};
