export class ConnectorCurrentSettings {
  currentDuplex: string;
  inputBytes: string;
  outputBytes: string;
  portSpeed: string;
  administrativeStatus: string;
  connectedToVLANs: string;
  runningDirectory: string;

  constructor(values: Object = {}) {
    (<any>Object).assign(this, values);
  }
}
