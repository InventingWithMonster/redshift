import { each } from '../inc/utils';
import * as loop from './loop';

export default class Process {
    /*
        [object]: Properties
        [boolean] (optional): Is Process lazy?
    */
    constructor(props, isLazy) {
        this.set(this.getDefaultProps());
        this.set(props);

        this.isLazy = isLazy || false;
        this.id = loop.getProcessId();
        this.isActive = false;
    }

    set(props) {
        each(props, (value, key) => this[key] = value);
        return this;
    }

    start() {
        this.isActive = true;
        loop.activate(this.id, this);
        return this;
    }

    stop() {
        this.isActive = false;
        loop.deactivate(this.id);
        return this;
    }

    once() {
        this.onCleanup = () => {
            this.stop();
            this.onCleanup = undefined;
        };

        this.start();

        return this;
    }

    /*
        # Get default Action properties

        @return [object]
    */
    getDefaultProps() {
        return {};
    }

    /*
        # Extend this Process with new properties
        ## Returns new instance of this Process's `prototype` with existing and new properties

        @param [object] (optional)
        @return [Process]
    */
    inherit(props) {
        return new this.constructor({ ...this, props });
    }
};