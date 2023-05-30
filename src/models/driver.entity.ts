import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm'
import Model from './model.entity'
import { RideEntity } from './ride.entity'
import { UserEntity } from './user.entity'
import { StatusEnumType } from '../utils/enums'

@Entity('drivers')
export class DriverEntity extends Model {
   @OneToOne((type) => UserEntity, (user) => user.id)
   @JoinColumn({ name: 'user_id' })
   user: UserEntity

   @Column()
   user_id: string

   @OneToMany((type) => RideEntity, (ride) => ride.id)
   rides: RideEntity[]

   @Column({
      type: 'enum',
      enum: StatusEnumType,
      default: StatusEnumType.AVAILABLE,
   })
   status: StatusEnumType
}
