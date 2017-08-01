export class ConnectorCurrentSettings {
  currentDuplex: string;
  inputBytes: string;
  outputBytes: string;
  portSpeed: string;
  administrativeStatus: string;
  connectedToVLANs: string;

  constructor(values: Object = {}) {
    (<any>Object).assign(this, values);
  }
}
