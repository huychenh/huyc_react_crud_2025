export interface UserListProps {
  onViewUser?: (userId: number) => void;
  onEditUser?: (userId: number) => void;
  onDeleteUser?: (userId: number) => void;
}
