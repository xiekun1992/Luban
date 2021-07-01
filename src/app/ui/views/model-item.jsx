import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import path from 'path';
import i18n from '../../lib/i18n';
import TipTrigger from '../components/TipTrigger';
import Anchor from '../components/Anchor';
// import { limitStringLength } from '../../lib/normalize-range';

function ModelItem({ model, visible, isSelected, styles, onSelect, onToggleVisible, inProgress }) {
    if (!model) {
        return null;
    }
    let modelName = '';
    let modelIcon = '';
    if (model.headType === '3dp') {
        modelName = path.basename(model.modelName);
        modelIcon = styles.iconShape;
    } else {
        const taskInfo = model.getTaskInfo();
        modelName = taskInfo.modelName;
        modelIcon = (() => {
            if (taskInfo.sourceType === 'text') {
                return styles.iconText;
            }
            if (taskInfo.mode !== 'vector') {
                return styles.iconPic;
            }
            return styles.iconShape;
        })();
    }
    const prefixName = modelName.slice(0, modelName.length - 7);
    const suffixName = modelName.slice(-7);
    // const displayModelName = limitStringLength(modelName, 36);

    return (
        <TipTrigger
            key={model.modelName}
            title={i18n._('Object')}
            content={model.modelName}
        >
            <div>
                <div
                    className={classNames(
                        styles['object-list-item'],
                        isSelected ? styles.selected : null,
                    )}
                >
                    <Anchor
                        className={classNames(
                            styles.name,
                            styles.bt
                        )}
                        style={{ width: '270px' }}
                        onClick={(event) => onSelect(model, event.shiftKey)}
                    >
                        <span
                            className={classNames(
                                styles.icon,
                                modelIcon
                            )}
                        />
                        {/* {displayModelName} */}
                        <span className={classNames(styles.prefixName)}>
                            {prefixName}
                        </span>
                        <span className={classNames(styles.suffixName)}>
                            {suffixName}
                        </span>
                    </Anchor>
                    <button
                        type="button"
                        className={classNames(
                            styles.icon,
                            visible ? styles.iconHideOpen : styles.iconHideClose,
                            styles.bt
                        )}
                        onClick={() => onToggleVisible(model)}
                        disabled={inProgress}
                    />
                </div>
            </div>
        </TipTrigger>
    );
}
ModelItem.propTypes = {
    model: PropTypes.object.isRequired,
    styles: PropTypes.object.isRequired,
    visible: PropTypes.bool.isRequired,
    isSelected: PropTypes.bool.isRequired,
    onSelect: PropTypes.func.isRequired,
    onToggleVisible: PropTypes.func.isRequired,
    inProgress: PropTypes.bool.isRequired
};

export default React.memo(ModelItem);
