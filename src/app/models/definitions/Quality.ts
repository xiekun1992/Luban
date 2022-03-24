import { DefinitionItem } from './PrintingDefinitionManager';

export default class Quality {
    id: string;

    // quality
    layerHeight: DefinitionItem = {
        label: 'Layer Height',
        description: 'The height of each layer in mm. Higher values produce faster prints in lower resolution, lower values produce slower prints in higher resolution.',
        unit: 'mm',
        type: 'float',
        default_value: 0.1,
        minimum_value: '0.001'
    };

    initialLayerHeight: DefinitionItem = {
        label: 'Initial Layer Height',
        description: 'The height of the initial layer in mm. A thicker initial layer makes adhesion to the build plate easier.',
        unit: 'mm',
        type: 'float',
        default_value: 0.28,
        minimum_value: '0.001'
    };

    initialLayerLineWidth: DefinitionItem = {
        label: 'Initial Layer Line Width',
        description: 'Multiplier of the line width on the first layer. Increasing this could improve bed adhesion.',
        type: 'float',
        unit: '%',
        default_value: 150.0,
        minimum_value: '0.001'
    };

    // shell
    wallThickness: DefinitionItem = {
        label: 'Wall Thickness',
        description: 'The thickness of the walls in the horizontal direction. This value divided by the wall line width defines the number of walls.',
        unit: 'mm',
        default_value: 0.8,
        value: 'wall_line_width_0 if magic_spiralize else 0.8',
        minimum_value: '0',
        type: 'float'
    };

    topThickness: DefinitionItem = {
        label: 'Top Thickness',
        description: 'The thickness of the top layers in the print. This value divided by the layer height defines the number of top layers.',
        unit: 'mm',
        default_value: 0.8,
        minimum_value: '0',
        maximum_value: 'machine_height',
        type: 'float',
        value: 'top_bottom_thickness'
    };

    bottomThickness: DefinitionItem = {
        label: 'Bottom Thickness',
        description: 'The thickness of the bottom layers in the print. This value divided by the layer height defines the number of bottom layers.',
        unit: 'mm',
        default_value: 0.6,
        minimum_value: '0',
        type: 'float',
        value: 'top_bottom_thickness',
        maximum_value: 'machine_height'
    };

    outerBeforeInnerWalls: DefinitionItem = {
        label: 'Outer Before Inner Walls',
        description: 'Prints walls in order of outside to inside when enabled. This can help improve dimensional accuracy in X and Y when using a high viscosity plastic like ABS; however it can decrease outer surface print quality, especially on overhangs.',
        type: 'bool',
        default_value: false,
        enabled: 'wall_0_extruder_nr == wall_x_extruder_nr'
    };

    // infill
    infillDensity: DefinitionItem = {
        label: 'Infill Density',
        description: 'Adjusts the density of infill of the print.',
        unit: '%',
        type: 'float',
        default_value: 20,
        minimum_value: '0'
    };

    infillPattern: DefinitionItem = {
        label: 'Infill Pattern',
        description: 'The pattern of the infill material of the print. The line and zig zag infill swap direction on alternate layers, reducing material cost. The grid, triangle, tri-hexagon, cubic, octet, quarter cubic, cross and concentric patterns are fully printed every layer. Gyroid, cubic, quarter cubic and octet infill change with every layer to provide a more equal distribution of strength over each direction.',
        type: 'enum',
        options: {
            grid: 'Grid',
            lines: 'Lines',
            triangles: 'Triangle',
            trihexagon: 'Tri-Hexagon',
            cubic: 'Cubic',
            cubicsubdiv: 'Cubic Subdivision',
            tetrahedral: 'Octet',
            quarter_cubic: 'Quarter Cubic',
            concentric: 'Concentric',
            zigzag: 'Zig Zag',
            cross: 'Cross',
            cross_3d: 'Cross 3D',
            gyroid: 'Gyroid'
        },
        default_value: 'grid',
        enabled: 'infill_sparse_density > 0',
        value: "'lines' if infill_sparse_density > 25 else 'grid'"
    };

    // speed
    initialLayerPrintingSpeed: DefinitionItem = {
        "label": "Initial Layer Printing Speed",
        "description": "The speed of printing for the initial layer. A lower value is advised to improve adhesion to the build plate.",
        "unit": "mm/s",
        "type": "float",
        "default_value": 40,
        "value": "speed_layer_0",
        "minimum_value": "0.1",
        "maximum_value": "math.sqrt(machine_max_feedrate_x ** 2 + machine_max_feedrate_y ** 2)",
    };

    infillSpeed: DefinitionItem = {
        "label": "Infill Speed",
        "description": "The speed at which infill is printed.",
        "unit": "mm/s",
        "type": "float",
        "minimum_value": "0.1",
        "maximum_value": "math.sqrt(machine_max_feedrate_x ** 2 + machine_max_feedrate_y ** 2)",
        "default_value": 60,
        "value": "speed_print",
        "enabled": "infill_sparse_density > 0",
    };

    outerWallSpeed: DefinitionItem = {
        "label": "Outer Wall Speed",
        "description": "The speed at which the outermost walls are printed. Printing the outer wall at a lower speed improves the final skin quality. However, having a large difference between the inner wall speed and the outer wall speed will affect quality in a negative way.",
        "unit": "mm/s",
        "type": "float",
        "minimum_value": "0.1",
        "maximum_value": "math.sqrt(machine_max_feedrate_x ** 2 + machine_max_feedrate_y ** 2)",
        "default_value": 30,
        "value": "speed_wall",
    };

    innerWallSpeed: DefinitionItem = {
        "label": "Inner Wall Speed",
        "description": "The speed at which all inner walls are printed. Printing the inner wall faster than the outer wall will reduce printing time. It works well to set this in between the outer wall speed and the infill speed.",
        "unit": "mm/s",
        "type": "float",
        "minimum_value": "0.1",
        "maximum_value": "math.sqrt(machine_max_feedrate_x ** 2 + machine_max_feedrate_y ** 2)",
        "default_value": 60,
        "value": "speed_wall * 2",
    };

    topBottomSpeed: DefinitionItem = {
        "label": "Top/Bottom Speed",
        "description": "The speed at which top/bottom layers are printed.",
        "unit": "mm/s",
        "type": "float",
        "minimum_value": "0.1",
        "maximum_value": "math.sqrt(machine_max_feedrate_x ** 2 + machine_max_feedrate_y ** 2)",
        "default_value": 30,
        "value": "speed_print / 2",
        "enabled": "top_layers > 0 or bottom_layers > 0",
    };

    travelSpeed: DefinitionItem = {
        "label": "Travel Speed",
        "description": "The speed at which travel moves are made.",
        "unit": "mm/s",
        "type": "float",
        "default_value": 120,
        "minimum_value": "0.1",
        "maximum_value": "math.sqrt(machine_max_feedrate_x ** 2 + machine_max_feedrate_y ** 2)",
        "value": "speed_print if magic_spiralize else 120",
    };

    initialLayerTravelSpeed: DefinitionItem = {
        "label": "Initial Layer Travel Speed",
        "description": "The speed of travel moves in the initial layer. A lower value is advised to prevent pulling previously printed parts away from the build plate. The value of this setting can automatically be calculated from the ratio between the Travel Speed and the Print Speed.",
        "unit": "mm/s",
        "type": "float",
        "default_value": 60,
        "value": "speed_layer_0 * speed_travel / speed_print",
        "minimum_value": "0.1",
        "maximum_value": "math.sqrt(machine_max_feedrate_x ** 2 + machine_max_feedrate_y ** 2)",
    };

    // surface
    spiralizeOuterContour: DefinitionItem = {
        "label": "Spiralize Outer Contour",
        "description": "Spiralize smooths out the Z move of the outer edge. This will create a steady Z increase over the whole print. This feature turns a solid model into a single walled print with a solid bottom. This feature should only be enabled when each layer only contains a single part.",
        "type": "bool",
        "default_value": false,
    };

    skirtLineCount: DefinitionItem = {
        "label": "Skirt Line Count",
        "description": "Multiple skirt lines help to prime your extrusion better for small models. Setting this to 0 will disable the skirt.",
        "type": "int",
        "default_value": 1,
        "minimum_value": "0",
        "maximum_value_warning": "10",
        "enabled": "resolveOrValue('adhesion_type') == 'skirt'",
    };

    // support
    generateAutoSupport: DefinitionItem = {
        "label": "Generate Support",
        "description": "Generate structures to support parts of the model which have overhangs. Without these structures, such parts would collapse during printing.",
        "type": "bool",
        "default_value": false,
    };

    supportPlacement: DefinitionItem = {
        "label": "Support Placement",
        "description": "Adjusts the placement of the support structures. The placement can be set to Touching Build Plate or Everywhere. When set to Everywhere, the support structures will also be printed on the model.",
        "type": "enum",
        "options":
        {
            "buildplate": "Touching Build Plate",
            "everywhere": "Everywhere"
        },
        "default_value": "everywhere",
        "resolve": "'everywhere' if 'everywhere' in extruderValues('support_type') else 'buildplate'",
        "enabled": "support_enable",
    };

    supportPattern: DefinitionItem = {
        "label": "Support Pattern",
        "description": "The pattern of the support structures of the print. The different options available result in sturdy or easy to remove support.",
        "type": "enum",
        "options":
        {
            "lines": "Lines",
            "grid": "Grid",
            "triangles": "Triangle",
            "concentric": "Concentric",
            "zigzag": "Zig Zag",
            "cross": "Cross",
            "gyroid": "Gyroid"
        },
        "default_value": "zigzag",
        "enabled": "support_enable or support_meshes_present",
    };

    supportDensity: DefinitionItem = {
        "label": "Support Density",
        "description": "Adjusts the density of the support structure. A higher value results in better overhangs, but the supports are harder to remove.",
        "unit": "%",
        "type": "float",
        "minimum_value": "0",
        "default_value": 15,
        "value": "15 if support_enable and support_structure == 'normal' else 0 if support_enable and support_structure == 'tree' else 15",
        "enabled": "support_enable or support_meshes_present",
    };

    supportZDistance: DefinitionItem = {
        "label": "Support Z Distance",
        "description": "Distance from the top/bottom of the support structure to the print. This gap provides clearance to remove the supports after the model is printed. This value is rounded up to a multiple of the layer height.",
        "unit": "mm",
        "type": "float",
        "minimum_value": "0",
        "maximum_value_warning": "machine_nozzle_size",
        "default_value": 0.1,
        "limit_to_extruder": "support_interface_extruder_nr if support_interface_enable else support_infill_extruder_nr",
        "enabled": "support_enable or support_meshes_present",
    };

    supportOverhangAngle: DefinitionItem = {
        "label": "Support Overhang Angle",
        "description": "The minimum angle of overhangs for which support is added. At a value of 0° all overhangs are supported, 90° will not provide any support.",
        "unit": "°",
        "type": "float",
        "minimum_value": "0",
        "maximum_value": "90",
        "maximum_value_warning": "80",
        "default_value": 50,
        "enabled": "support_enable",
    };
}
