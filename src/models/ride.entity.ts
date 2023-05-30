import {
   Column,
   Entity,
   JoinColumn,
   ManyToOne,
   OneToMany,
   OneToOne,
} from 'typeorm'
import Model from './model.entity'
import { RiderEntity } from './rider.entity'
import { DriverEntity } from './driver.entity'
import { ILatLong } from '../utils/interfaces'
import { PaymentMethodEntity } from './payment-method.entity'
import { TransactionEntity } from './transaction.entity'
import { StatusRideTypeEnum } from '../utils/enums'

@Entity('rides')
export class RideEntity extends Model {
   @ManyToOne((type) => RiderEntity, (rider) => rider.id)
   @JoinColumn({ name: 'riderId' })
   rider: RiderEntity

   @Column()
   riderId: string

   @ManyToOne((type) => DriverEntity, (driver) => driver.id)
   @JoinColumn({ name: 'driverId' })
   driver: DriverEntity

   @Column()
   driverId: string

   @Column({ type: 'simple-json' })
   origin: ILatLong

   @Column({ type: 'simple-json', nullable: true })
   destination: ILatLong

   @Column({ nullable: true })
   distance?: number

   @Column({ nullable: true })
   duration?: number

   @Column({ type: 'int', nullable: true })
   amount_in_cents?: number

   @OneToOne((type) => PaymentMethodEntity, (paymentMethod) => paymentMethod.id)
   @JoinColumn({ name: 'paymentMethodId' })
   paymentMethod: string

   @Column()
   paymentMethodId: string

   @Column({
      nullable: true,
   })
   paymentMethodType: string

   @OneToMany((type) => TransactionEntity, (transaction) => transaction.id)
   transactions: TransactionEntity[]

   @Column({
      type: 'enum',
      enum: StatusRideTypeEnum,
      default: StatusRideTypeEnum.PENDING,
   })
   status: StatusRideTypeEnum
}
