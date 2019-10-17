import { Tree, Icon } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import HeaderDropdown from '../components/HeaderDropdown';
import styles from './utils.less';

const { TreeNode } = Tree;
/**
 *
 * @param nodes
 * @param menu
 * @returns {*} tree nodes.
 */
export function makeTreeNodeI18NNameAndOperation(nodes, menu) {
  return nodes.map(v => {
    const nodeKey = v.id;
    return (
      <TreeNode
        className={styles.treeNode}
        data={v}
        title={
          <div>
            {/* {formatMessage({ id: v.name, defaultMessage: v.remark })} */}
            {v.name}
            <HeaderDropdown overlay={menu(v)} placement="bottomRight">
              <Icon type="ellipsis" />
            </HeaderDropdown>
          </div>
        }
        key={nodeKey}
      >
        {v.children.length > 0 && makeTreeNodeI18NNameAndOperation(v.children, menu)}
        <span>...</span>
      </TreeNode>
    );
  });
}
