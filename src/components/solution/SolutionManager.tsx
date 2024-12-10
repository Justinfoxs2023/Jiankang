import React, { useState, useEffect } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Card,
  Typography,
  Button,
  Dialog,
  TextField,
  Chip
} from '@mui/material';
import { Solution, Contribution, ContributionType } from '../../types/solution';

interface SolutionManagerProps {
  solution: Solution;
  isVendor: boolean;
  onContribute: (contribution: Partial<Contribution>) => Promise<void>;
  onAcceptContribution: (contributionId: string) => Promise<void>;
  onRejectContribution: (contributionId: string, reason: string) => Promise<void>;
}

export const SolutionManager: React.FC<SolutionManagerProps> = ({
  solution,
  isVendor,
  onContribute,
  onAcceptContribution,
  onRejectContribution
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [contributionDialog, setContributionDialog] = useState({
    open: false,
    type: ContributionType.FEATURE,
    content: ''
  });

  const handleContribute = async () => {
    await onContribute({
      type: contributionDialog.type,
      content: contributionDialog.content,
      status: 'pending'
    });
    setContributionDialog({ ...contributionDialog, open: false });
  };

  return (
    <Box className="solution-manager">
      <Card className="solution-header">
        <Typography variant="h5">{solution.title}</Typography>
        <Box className="solution-stats">
          <Chip label={`浏览 ${solution.stats.views}`} />
          <Chip label={`收藏 ${solution.stats.collections}`} />
          <Chip label={`贡献 ${solution.stats.contributions}`} />
          <Chip label={`评分 ${solution.stats.rating}`} />
        </Box>
      </Card>

      <Tabs
        value={activeTab}
        onChange={(_, value) => setActiveTab(value)}
        className="solution-tabs"
      >
        <Tab label="功能特点" />
        <Tab label="使用方法" />
        <Tab label="注意事项" />
        <Tab label="常见问题" />
        <Tab label="贡献记录" />
      </Tabs>

      <Box className="solution-content">
        {activeTab === 0 && (
          <ContentSection
            title="功能特点"
            items={solution.content.features}
            contributions={solution.contributors.flatMap(c => 
              c.contributions.filter(cont => cont.type === ContributionType.FEATURE)
            )}
            isVendor={isVendor}
            onAddContribution={() => setContributionDialog({
              open: true,
              type: ContributionType.FEATURE,
              content: ''
            })}
            onAccept={onAcceptContribution}
            onReject={onRejectContribution}
          />
        )}
        {/* Similar sections for other tabs */}
      </Box>

      <ContributionDialog
        open={contributionDialog.open}
        type={contributionDialog.type}
        onClose={() => setContributionDialog({ ...contributionDialog, open: false })}
        onSubmit={handleContribute}
        onChange={(content) => setContributionDialog({ ...contributionDialog, content })}
      />
    </Box>
  );
};

// 内容区块组件
const ContentSection: React.FC<{
  title: string;
  items: string[];
  contributions: Contribution[];
  isVendor: boolean;
  onAddContribution: () => void;
  onAccept: (id: string) => Promise<void>;
  onReject: (id: string, reason: string) => Promise<void>;
}> = ({ title, items, contributions, isVendor, onAddContribution, onAccept, onReject }) => {
  return (
    <Box className="content-section">
      <Typography variant="h6">{title}</Typography>
      <Box className="content-items">
        {items.map((item, index) => (
          <Typography key={index}>{item}</Typography>
        ))}
      </Box>
      
      <Box className="contributions">
        <Typography variant="subtitle1">待审核贡献</Typography>
        {contributions
          .filter(c => c.status === 'pending')
          .map(contribution => (
            <Card key={contribution.id} className="contribution-card">
              <Typography>{contribution.content}</Typography>
              {isVendor && (
                <Box className="action-buttons">
                  <Button onClick={() => onAccept(contribution.id)}>
                    接受
                  </Button>
                  <Button onClick={() => onReject(contribution.id, '')}>
                    拒绝
                  </Button>
                </Box>
              )}
            </Card>
          ))}
      </Box>

      <Button onClick={onAddContribution}>
        添加贡献
      </Button>
    </Box>
  );
}; 