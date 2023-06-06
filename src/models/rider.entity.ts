import { OneToOne, JoinColumn, Column, OneToMany, Entity } from 'typeorm'
import Model from './model.entity'
import { UserEntity } from './user.entity'
import { RideEntity } from './ride.entity'
import { PaymentMethodEntity } from './payment-method.entity'
import { StatusEnumType } from '../utils/enums'
import { ILatLong } from '../utils/interfaces'

@Entity('riders')
export class RiderEntity extends Model {
   @OneToOne((type) => UserEntity, (user) => user.id)
   @JoinColumn({ name: 'userId' })
   user: UserEntity

   @Column()
   userId: string

   @Column({ type: 'jsonb' })
   currentUbication: ILatLong

   @OneToMany((type) => RideEntity, (ride) => ride.id)
   rides: RideEntity[]

   @OneToMany(
      (type) => PaymentMethodEntity,
      (paymentMethod) => paymentMethod.id
   )
   paymentMethods: PaymentMethodEntity[]

   @Column({
      type: 'enum',
      enum: StatusEnumType,
      default: StatusEnumType.AVAILABLE,
   })
   status: StatusEnumType
}
