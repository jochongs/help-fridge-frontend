import { storageType, type StorageType } from "../../../storage-type";
import type { FoodEntity } from "../../food/model/food";
import type { UnitEntity } from "../../unit/model/unit";
import type { UserEntity } from "../../user/model/user";

export interface FridgeEntity {
  idx: number;
  storage: StorageType;
  food: FoodEntity;
  unit: UnitEntity;
  user: Pick<UserEntity, "idx">;
  amount: number;
  createdAt: string;
  expiredAt: string | null;
}

const foodData: FoodEntity = {
  idx: 1,
  name: "사과",
  category: {
    idx: 1,
    name: "과일",
  },
  unit: [
    {
      idx: 1,
      name: "개",
    },
    {
      idx: 2,
      name: "kg",
    },
  ],
  expiration: 7,
};

export const fridgeMockingData: FridgeEntity = {
  idx: 1,
  storage: storageType.FROZ,
  food: foodData,
  unit: {
    idx: 1,
    name: "개",
  },
  user: {
    idx: 1,
  },
  amount: 5,
  createdAt: new Date().toISOString(),
  expiredAt: null,
};
