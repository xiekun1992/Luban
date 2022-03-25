import { DefinitionItem } from './PrintingDefinitionManager';

export default class Material {
    id: string;

    color: string;

    // temperature
    printingTemperature: DefinitionItem = {
        label: 'Printing Temperature',
        description: 'The temperature used for printing.',
        unit: '°C',
        type: 'float',
        default_value: 210,
        value: 'default_material_print_temperature',
        minimum_value: '-273.15',
        maximum_value: '365',
        enabled: 'machine_nozzle_temp_enabled and not (material_flow_dependent_temperature)',
    };

    initialLayerPrintingTemperature: DefinitionItem = {
        label: 'Printing Temperature Initial Layer',
        description: 'The temperature used for printing the first layer. Set at 0 to disable special handling of the initial layer.',
        unit: '°C',
        type: 'float',
        default_value: 215,
        value: 'material_print_temperature',
        minimum_value: '-273.15',
        maximum_value: '365',
        enabled: 'machine_nozzle_temp_enabled',
    };

    fanSpeed: DefinitionItem = {
        label: 'Fan Speed',
        description: 'The speed at which the print cooling fans spin.',
        unit: '%',
        type: 'float',
        minimum_value: '0',
        maximum_value: '100',
        default_value: 100,
        value: '100.0 if cool_fan_enabled else 0.0',
        enabled: 'cool_fan_enabled',
    };

    enableHeatedBuildPlate: DefinitionItem = {
        label: 'Enable Heated Build Plate',
        description: 'Whether the machine enables the heated build plate to provide heat to avoid warp.',
        default_value: false,
        type: 'bool',
    };

    buildPlateTemperature: DefinitionItem = {
        label: 'Build Plate Temperature',
        description: 'The temperature used for the heated build plate. If this is 0, the build plate is left unheated during the first layer.',
        unit: '°C',
        type: 'float',
        default_value: 60,
        value: 'default_material_bed_temperature',
        minimum_value: '-273.15',
        maximum_value: '200',
        enabled: 'machine_heated_bed and machine_gcode_flavor != "UltiGCode"',
    };

    initialBuildPlateTemperature: DefinitionItem = {
        label: 'Initial Layer Build Plate Temperature',
        description: 'The temperature used for the heated build plate at the first layer. If this is 0, the build plate is left unheated during the first layer.',
        unit: '°C',
        type: 'float',
        default_value: 60,
        value: "resolveOrValue('material_bed_temperature')",
        minimum_value: '-273.15',
        maximum_value: '200',
        enabled: 'machine_heated_bed and machine_gcode_flavor != "UltiGCode"',
    };

    // extrusion
    flow: DefinitionItem = {
        label: 'Flow',
        description: 'Flow compensation: the amount of material extruded is multiplied by this value.',
        unit: '%',
        default_value: 100,
        type: 'float',
        minimum_value: '5',
        enabled: 'machine_gcode_flavor != "UltiGCode"',
    };

    initialLayerFlow: DefinitionItem = {
        label: 'Initial Layer Flow',
        description: 'Flow compensation for the first layer: the amount of material extruded on the initial layer is multiplied by this value.',
        unit: '%',
        default_value: 100,
        type: 'float',
        minimum_value: '0.0001',
    };

    // retract & Z hop
    enableRetraction: DefinitionItem = {
        label: 'Enable Retraction',
        description: 'Retract the filament when the nozzle is moving over a non-printed area.',
        type: 'bool',
        default_value: true,
    };

    retractAtLayerChange: DefinitionItem = {
        label: 'Retract at Layer Change',
        description: 'Retract the filament when the nozzle is moving to the next layer.',
        type: 'bool',
        default_value: false,
    };

    retractionDistance: DefinitionItem = {
        label: 'Retraction Distance',
        description: 'The length of material retracted during a retraction move.',
        unit: 'mm',
        type: 'float',
        default_value: 6.5,
        enabled: 'retraction_enable and machine_gcode_flavor != "UltiGCode"',
    };

    retractionSpeed: DefinitionItem = {
        label: 'Retraction Speed',
        description: 'The speed at which the filament is retracted and primed during a retraction move.',
        unit: 'mm/s',
        type: 'float',
        default_value: 25,
        minimum_value: '0.0001',
        maximum_value: "machine_max_feedrate_e if retraction_enable else float('inf')",
        enabled: 'retraction_enable and machine_gcode_flavor != "UltiGCode"',
    };

    zHopWhenRetracted: DefinitionItem = {
        label: 'Z Hop When Retracted',
        description: 'Whenever a retraction is done, the nozzle is raised to create clearance between the nozzle and the print. It prevents the nozzle from hitting the print during travel moves, reducing the chance to knock the print from the build plate.',
        type: 'bool',
        default_value: false,
        enabled: 'retraction_enable',
    };

    zHopHeight: DefinitionItem = {
        label: 'Z Hop Height',
        description: 'The height difference when performing a Z Hop.',
        unit: 'mm',
        type: 'float',
        default_value: 1,
        enabled: 'retraction_enable and retraction_hop_enabled',
    };
}
