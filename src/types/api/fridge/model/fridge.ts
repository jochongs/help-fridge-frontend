import type { StorageType } from "../../../storage-type";
import type { FoodEntity } from "../../food/model/food";
import type { UnitEntity } from "../../unit/model/unit";

export interface FridgeEntity {
  idx: number;
  storage: StorageType;
  food: FoodEntity;
  unit: UnitEntity;
  user: FridgeEntity;
  amount: number;
  createdAt: Date;
  expiredAt: Date | null;
}
