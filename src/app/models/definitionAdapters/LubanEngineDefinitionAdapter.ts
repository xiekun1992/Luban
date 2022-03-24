import PrintingDefinitionManager from '../definitions/PrintingDefinitionManager';
import { DefinitionAdapter } from './DefinitionAdapterInterface';

export default class LubanEngineDefinitionAdapter implements DefinitionAdapter {
    manager: PrintingDefinitionManager;

    constructor(manager: PrintingDefinitionManager) {
        this.manager = manager;
    }

    convert(): Object {
        throw new Error('Method not implemented.');
    }
}
