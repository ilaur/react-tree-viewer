import React from 'react';
import { TreeView, TreeItem } from '@mui/lab';
import { ExpandMore, ChevronRight } from '@mui/icons-material';

type TreeNode = { name: string; json: object; children: TreeNode };

export default function ParameterTree() {
  // Mock response from the Parameter Service
  const data = require('./response_mock.json');
  console.info(data);

  const renderChildNode = (node: TreeNode | null, index: string): React.ReactNode | null => {
    if (node === null) {
      return node;
    } else if (Array.isArray(node) && node.length > 0) {
      return (
        <TreeView
          aria-label={`level-${index}-navigator`}
          defaultCollapseIcon={<ExpandMore />}
          defaultExpandIcon={<ChevronRight />}
          onNodeSelect={(id: any) => console.info(id)}
          key={index}
        >
          {node.map((value, idx) => {
            const newIdx = index.toString() + idx.toString();

            return (
              <TreeItem key={newIdx} nodeId={newIdx} label={value?.name}>
                {renderChildNode(value?.children, newIdx)}
              </TreeItem>
            );
          })}
        </TreeView>
      );
    }

    return <TreeItem key={index} nodeId={index} label={node?.name} />;
  };

  return (
    <TreeView
      aria-label="level-root-navigator"
      defaultCollapseIcon={<ExpandMore />}
      defaultExpandIcon={<ChevronRight />}
      onNodeSelect={(id: any) => console.info(id)}
    >
      {renderChildNode(data?.response, '')}
    </TreeView>
  );
}
