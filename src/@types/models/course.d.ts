interface Schedule {
  _id: boolean;
  from: number;
  to: number;
  day: number;
  teacher: String;
}

interface Section {
  _id: boolean;
  section: String;
  times: Array<Schedule>;
}

interface CourseDBO {
  code: String;
  career: String;
  name: String;
  sections: Array<Section>;
  createdAt: Date;
  updatedAt: Date;
}
