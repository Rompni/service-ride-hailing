enum StatusEnumType {
   AVAILABLE = 'available',
   ONARIDE = 'onaride',
}

enum RoleEnumType {
   RIDER = 'rider',
   DRIVER = 'driver',
}

enum PaymentMethodTypeEnum {
   CARD = 'CARD',
   NEQUI = 'NEQUI',
}

enum StatusRideTypeEnum {
   PENDING = 'pending',
   INPROGRESS = 'in_progress',
   FINISHED = 'finished',
}

enum DefaultFeesInCentosEnum {
   PRICE_PER_KM = 100000,
   PRICE_PER_MINUTES = 20000,
   BASE_PRICE = 350000,
}

export {
   StatusEnumType,
   RoleEnumType,
   PaymentMethodTypeEnum,
   StatusRideTypeEnum,
   DefaultFeesInCentosEnum,
}

