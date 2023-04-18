import React from 'react';
import { useEffect, useState } from 'react';
import { TextField, Typography } from '@mui/material';

import { ParameterNode } from '../requests/types';

import { useAppContext } from '../AppContext';

export default function ParametersBranchEditor(): React.ReactElement {
  const { parameters, selectedNodeId } = useAppContext();
  const [currentFields, setCurrentFields] = useState<ParameterNode | null>();

  useEffect(() => {
    const findNodeAndSetFields = (
      treeNode: ParameterNode | null,
      targetNodeId: string,
      currentNodeId: string = '0',
    ): void => {
      if (currentNodeId === targetNodeId) {
        setCurrentFields(treeNode);
        return;
      } else if (Array.isArray(treeNode) && treeNode.length > 0) {
        treeNode.forEach((node, id) => {
          const composedId = currentNodeId + id;

          if (composedId === targetNodeId) {
            setCurrentFields(node);
            return;
          }

          findNodeAndSetFields(node.children, targetNodeId, composedId);
        });
      }
    };

    if (selectedNodeId) {
      findNodeAndSetFields(parameters, selectedNodeId);
    }
  }, [selectedNodeId, parameters]);

  if (currentFields === undefined) {
    return <div />;
  }

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <Typography>Name: </Typography>
        <TextField value={currentFields?.name} fullWidth />
      </div>
      <div style={{ display: 'flex' }}>
        <Typography>Value: </Typography>
        <TextField
          id="standard-basic"
          value={JSON.stringify(currentFields?.json)}
          multiline
          minRows={15}
          fullWidth
        />
      </div>
    </div>
  );
}
