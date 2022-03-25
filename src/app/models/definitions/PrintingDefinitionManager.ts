import api from '../../api';
import { HEAD_PRINTING } from '../../constants';
import Extruder from './Extruder';
import Material from './Material';
import Quality from './Quality';
import i18n from '../../lib/i18n';

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
    headType: string;

    qualities: Quality[];

    activeQuality: Quality;

    defaultQualities: Quality[];

    materials: Material[];

    activeMaterial: Material;

    defaultMaterials: Material[];

    extruderLeft: Extruder;

    extruderRight: Extruder;

    constructor() {
        this.headType = HEAD_PRINTING;
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

    async init() {
        // active definition
        const activeDefinition = await this.getDefinition('active', false);
        const res = await api.profileDefinitions.getDefaultDefinitions(this.headType, this.configPathname);
        const defaultDefinitions = res.body.definitions.map(item => {
            item.isDefault = true;
            if (item.i18nCategory) {
                item.category = i18n._(item.i18nCategory);
            }
            if (item.i18nName) {
                item.name = i18n._(item.i18nName);
            }
            return item;
        });

        const extruderLDefinition = await this.getDefinition('snapmaker_extruder_0', false);

        const extruderRDefinition = await this.getDefinition('snapmaker_extruder_1', false);
    }

    async getDefinition(definitionId, isInsideCategory = true) {
        let res: any;
        if (isInsideCategory) {
            res = await api.profileDefinitions.getDefinition(this.headType, definitionId, this.configPathname);
        } else {
            res = await api.profileDefinitions.getDefinition(this.headType, definitionId);
        }
        const definition = res.body.definition;
        if (definition.i18nCategory) {
            definition.category = i18n._(definition.i18nCategory);
        }
        if (definition.i18nName) {
            definition.name = i18n._(definition.i18nName);
        }
        definition.isDefault = this.defaultDefinitions.findIndex(d => d.definitionId === definitionId) !== -1;
        return definition;
    }
}
