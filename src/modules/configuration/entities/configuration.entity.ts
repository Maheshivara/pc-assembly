export class UserConfig {
  id: string;
  name: string;
}
export class UserConfigDetails {
  id: string;
  motherboardId: string;
  cpuId: string;
  gpuId: string;
  psuId: string;
  memories: ConfigMemory[];
  storages: ConfigStorage[];
  history: ConfigHistory[];
}

class ConfigMemory {
  id: string;
  memoryId: string;
  quantity: number;
}

class ConfigStorage {
  id: string;
  storageId: string;
  quantity: number;
}

class ConfigHistory {
  id: string;
  action: string;
  date: Date;
}
