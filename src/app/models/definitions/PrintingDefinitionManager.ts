import Extruder from './Extruder';
import Material from './Material';
import Quality from './Quality';

/* eslint-disable camelcase */
export type DefinitionItem = {
    label: string;
    description: string;
    default_value: string | number | boolean;
    enabled?: string;
    type: string;
    unit?: string;
    options?: Object,
    value?: string;
    minimum_value?: string | number | boolean;
    maximum_value?: string | number | boolean;
}
/* eslint-enable camelcase */

export default class PrintingDefinitionManager {
    qualities: Quality[];

    activeQuality: Quality;

    defaultQualities: Quality[];

    materials: Material[];

    activeMaterial: Material;

    defaultMaterials: Material[];

    extruderLeft: Extruder;

    extruderRight: Extruder;

    constructor() {
        // acquire qualities & materials & extruders
        this.qualities = [];
        this.activeQuality = null;
        this.defaultQualities = [];

        this.materials = [];
        this.activeMaterial = null;
        this.defaultMaterials = [];

        this.extruderLeft = null;
        this.extruderRight = null;
    }
}
