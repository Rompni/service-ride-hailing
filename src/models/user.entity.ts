import { Entity, Column, Index } from 'typeorm'
import Model from './model.entity'
import { RoleEnumType } from '../utils/enums'

@Entity('users')
export class UserEntity extends Model {
   @Index('email_index')
   @Column({
      unique: true,
   })
   email: string

   @Column()
   password: string

   @Column({
      type: 'enum',
      enum: RoleEnumType,
      default: RoleEnumType.RIDER,
   })
   role: RoleEnumType
}
