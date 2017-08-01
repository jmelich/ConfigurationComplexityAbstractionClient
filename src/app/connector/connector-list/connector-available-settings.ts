export class ConnectorAvailableSettings {
  portSpeed: string;
  duplexMode: string;
  administrativeStatus: string;
  availableVLANs: string;

  constructor(values: Object = {}) {
    (<any>Object).assign(this, values);
  }
}
