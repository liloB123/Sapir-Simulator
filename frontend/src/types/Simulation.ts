export type SimulationStatus = 'הושלם' | 'ממתין' | 'רץ';

export type Simulation = {
  title: string;
  subtitle: string;
  status: SimulationStatus;
};