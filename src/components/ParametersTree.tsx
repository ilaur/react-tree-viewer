import React from 'react';
import { useEffect } from 'react';
import { TreeView, TreeItem } from '@mui/lab';
import { ExpandMore, ChevronRight } from '@mui/icons-material';

// import { getParameter } from '../requests/getParameter';
import { ParameterNode } from '../requests/types';
import { useAppContext } from '../AppContext';

const mock_data = require('../response_mock.json');

export default function ParametersTree(): React.ReactElement {
  const { parameters, dispatch } = useAppContext();

  useEffect(() => {
    // TODO: Remove test calls
    // TODO2: Improve requests with react routes
    // setTimeout(() => {
    //   getParameter()
    //     .then((res) => {
    //       dispatch({
    //         type: 'addParameters',
    //         parameters: res,
    //       });
    //     })
    //     .catch((err) => {
    //       console.error(err);
    //     });
    // }, 4000);

    dispatch({
      type: 'addParameters',
      parameters: mock_data,
    });
  }, [dispatch]);

  const renderChildNode = (
    treeNode: ParameterNode | null,
    index: string,
  ): React.ReactNode | null => {
    if (!treeNode) {
      return treeNode;
    } else if (Array.isArray(treeNode) && treeNode.length > 0) {
      return (
        <TreeView
          aria-label={`level-${index}-navigator`}
          defaultCollapseIcon={<ExpandMore />}
          defaultExpandIcon={<ChevronRight />}
          onNodeSelect={(ev: any, nodeId: string) => {
            dispatch({
              type: 'selectedNode',
              selectedNode: nodeId,
            });
          }}
          key={index}
        >
          {treeNode.map((value, idx) => {
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

    return <TreeItem nodeId={index} label={treeNode?.name} />;
  };

  return (
    <TreeView
      aria-label="level›-root-navigator"
      defaultCollapseIcon={<ExpandMore />}
      defaultExpandIcon={<ChevronRight />}
      onNodeSelect={(ev: any, nodeId: string) => {
        dispatch({
          type: 'selectedNode',
          selectedNode: nodeId,
        });
      }}
    >
      {renderChildNode(parameters, '0')}
    </TreeView>
  );
}
