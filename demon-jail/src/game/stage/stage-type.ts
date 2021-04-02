export enum StageType {
    the_z = "the_z",
    the_snake = "the_snake",
    which_way = "which_way",
    around = "around",
    cross = "cross",
}

export namespace StageType {
    export function format(stageType: StageType): string {
        return stageType.toString()
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }
}
