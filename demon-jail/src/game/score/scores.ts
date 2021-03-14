import {StageType} from "../stage/stage-type";
import {Trophy} from "./trophy";

export type Scores = {
    [type in StageType]?: Trophy[];
};
