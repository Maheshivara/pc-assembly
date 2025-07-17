export class UserConfig {
  id: string;
  name: string;
}
export class UserConfigDetails {
  id: string;
  motherboardMpn: string;
  cpuMpn: string;
  gpuMpn: string;
  psuMpn: string;
  memories: ConfigMemory[];
  storages: ConfigStorage[];
  history: ConfigHistory[];
}

class ConfigMemory {
  id: string;
  memoryMpn: string;
  quantity: number;
}

class ConfigStorage {
  id: string;
  storageMpn: string;
  quantity: number;
}

class ConfigHistory {
  id: string;
  action: string;
  date: Date;
}
