import React from 'react';
import { useEffect } from 'react';
import { TreeView, TreeItem } from '@mui/lab';
import { ExpandMore, ChevronRight } from '@mui/icons-material';

import { getParameter } from '../requests/getParameter';
import { ParameterNode } from '../requests/types';
import { useAppContext } from '../AppContext';

export default function ParametersTree(): React.ReactElement {
  const { parameters, dispatch } = useAppContext();

  useEffect(() => {
    // TODO: Remove test calls
    // TODO2: Improve requests with react routes
    setTimeout(() => {
      getParameter()
        .then((response) => {
          dispatch({
            type: 'addParameters',
            parameters: response,
          });
        })
        .catch((err) => {
          console.error(err);
        });
    }, 1000);
  }, [dispatch]);

  const renderChildNode = (
    treeNode: ParameterNode | null,
    currentId: string,
  ): React.ReactNode | null => {
    if (!treeNode) {
      return treeNode;
    } else if (Array.isArray(treeNode) && treeNode.length > 0) {
      return (
        <TreeView
          aria-label={`level-${currentId}-navigator`}
          defaultCollapseIcon={<ExpandMore />}
          defaultExpandIcon={<ChevronRight />}
          onNodeSelect={(ev: any, nodeId: string) => {
            dispatch({
              type: 'selectedNodeId',
              selectedNodeId: nodeId,
            });
          }}
          key={currentId}
        >
          {treeNode.map((value, id) => {
            const composedId = currentId + id;

            return (
              <TreeItem key={composedId} nodeId={composedId} label={value?.name}>
                {renderChildNode(value.children, composedId)}
              </TreeItem>
            );
          })}
        </TreeView>
      );
    }

    return <TreeItem nodeId={currentId} label={treeNode.name} />;
  };

  return (
    <TreeView
      aria-label="level›-root-navigator"
      defaultCollapseIcon={<ExpandMore />}
      defaultExpandIcon={<ChevronRight />}
      onNodeSelect={(ev: any, nodeId: string) => {
        dispatch({
          type: 'selectedNodeId',
          selectedNodeId: nodeId,
        });
      }}
    >
      {renderChildNode(parameters, '0')}
    </TreeView>
  );
}
