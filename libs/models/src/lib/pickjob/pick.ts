export interface Pick {
  total:    number;
  pickjobs: Pickjob[];
}

export interface Pickjob {
  version:      number;
  created:      Date;
  lastModified: Date;
  id:           string;
  status:       string;
  orderRef:     string;
  facilityRef:  string;
}
