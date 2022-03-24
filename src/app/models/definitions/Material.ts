export default class Material {
    color: string;

    // temperature
    printingTemperature: number;

    initialLayerPrintingTemperature: number;

    fanSpeed: number;

    enableHeatedBuildPlate: boolean;

    buildPlateTemperature: number;

    initialBuildPlateTemperature: number;

    // extrusion
    flow: number;

    initialLayerFlow: number;

    // retract & Z hop
    enableRetraction: boolean;

    retractAtLayerChange: boolean;

    retractionDistance: number;

    retractionSpeed: number;

    zHopWhenRetracted: boolean;

    zHopHeight: number;
}
