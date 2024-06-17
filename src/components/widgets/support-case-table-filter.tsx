import React from 'react';
import { Toolbar } from '@patternfly/react-core/dist/dynamic/components/Toolbar';
import { ToolbarContent } from '@patternfly/react-core/dist/dynamic/components/Toolbar';
import { ToolbarFilter } from '@patternfly/react-core/dist/dynamic/components/Toolbar';
import { ToolbarToggleGroup } from '@patternfly/react-core/dist/dynamic/components/Toolbar';
import { ToolbarGroup } from '@patternfly/react-core/dist/dynamic/components/Toolbar';
import { Badge } from '@patternfly/react-core/dist/dynamic/components/Badge';
import {
  MenuToggle,
  MenuToggleElement,
} from '@patternfly/react-core/dist/dynamic/components/MenuToggle';
import { Select } from '@patternfly/react-core/dist/dynamic/components/Select';
import { SelectList } from '@patternfly/react-core/dist/dynamic/components/Select';
import { SelectOption } from '@patternfly/react-core/dist/dynamic/components/Select';
import FilterIcon from '@patternfly/react-icons/dist/esm/icons/filter-icon';

export const SupportCaseWidgetTableFilter: React.FunctionComponent = () => {
  const [isProductFamilyExpanded, setIsProductFamilyExpanded] =
    React.useState(false);
  const [isSeverityExpanded, setIsSeverityExpanded] = React.useState(false);
  const [isStatusExpanded, setIsStatusExpanded] = React.useState(false);
  const [filters, setFilters] = React.useState({
    productFamily: ['Low'],
    severity: [''],
    status: ['New', 'Pending'],
  });

  const onSelect = (
    type: string,
    event: React.MouseEvent<Element, MouseEvent> | React.ChangeEvent<Element>,
    selection: string
  ) => {
    const checked = (event.target as HTMLInputElement).checked;
    setFilters((prev) => {
      const prevSelections = prev[type];
      return {
        ...prev,
        [type]: checked
          ? [...prevSelections, selection]
          : prevSelections.filter((value: string) => value !== selection),
      };
    });
  };

  const onProductFamilySelect = (
    event: React.MouseEvent | React.ChangeEvent,
    selection: string
  ) => {
    onSelect('productFamily', event, selection);
  };

  const onSeveritySelect = (
    event: React.MouseEvent | React.ChangeEvent,
    selection: string
  ) => {
    onSelect('severity', event, selection);
  };

  const onStatusSelect = (
    event: React.MouseEvent | React.ChangeEvent,
    selection: string
  ) => {
    onSelect('status', event, selection);
  };

  const onDelete = (type: string, id: string) => {
    if (type === 'Product Family') {
      setFilters({
        productFamily: filters.productFamily.filter(
          (fil: string) => fil !== id
        ),
        severity: filters.severity,
        status: filters.status,
      });
    } else if (type === 'Severity') {
      setFilters({
        productFamily: filters.productFamily,
        severity: filters.severity.filter((fil: string) => fil !== id),
        status: filters.status,
      });
    } else if (type === 'Status') {
      setFilters({
        productFamily: filters.productFamily,
        severity: filters.severity,
        status: filters.status.filter((fil: string) => fil !== id),
      });
    } else {
      setFilters({ productFamily: [], severity: [], status: [] });
    }
  };

  const onDeleteGroup = (type: string) => {
    if (type === 'Product Family') {
      setFilters({
        productFamily: [],
        severity: filters.severity,
        status: filters.status,
      });
    } else if (type === 'Severity') {
      setFilters({
        productFamily: filters.productFamily,
        severity: [],
        status: filters.status,
      });
    } else if (type === 'Status') {
      setFilters({
        productFamily: filters.productFamily,
        severity: filters.severity,
        status: [],
      });
    }
  };

  const onProductFamilyToggle = () => {
    setIsProductFamilyExpanded(!isProductFamilyExpanded);
  };

  const onSeverityToggle = () => {
    setIsSeverityExpanded(!isSeverityExpanded);
  };

  const onStatusToggle = () => {
    setIsStatusExpanded(!isStatusExpanded);
  };

  const statusMenuItems = (
    <SelectList>
      <SelectOption
        hasCheckbox
        key="statusNew"
        value="New"
        isSelected={filters.status.includes('New')}
      >
        New
      </SelectOption>
      <SelectOption
        hasCheckbox
        key="statusPending"
        value="Pending"
        isSelected={filters.status.includes('Pending')}
      >
        Pending
      </SelectOption>
      <SelectOption
        hasCheckbox
        key="statusRunning"
        value="Running"
        isSelected={filters.status.includes('Running')}
      >
        Running
      </SelectOption>
      <SelectOption
        hasCheckbox
        key="statusCancelled"
        value="Cancelled"
        isSelected={filters.status.includes('Cancelled')}
      >
        Cancelled
      </SelectOption>
    </SelectList>
  );

  const severityMenuItems = (
    <SelectList>
      <SelectOption
        hasCheckbox
        key="riskLow"
        value="Low"
        isSelected={filters.risk.includes('Low')}
      >
        Low
      </SelectOption>
      <SelectOption
        hasCheckbox
        key="riskMedium"
        value="Medium"
        isSelected={filters.risk.includes('Medium')}
      >
        Medium
      </SelectOption>
      <SelectOption
        hasCheckbox
        key="riskHigh"
        value="High"
        isSelected={filters.risk.includes('High')}
      >
        High
      </SelectOption>
    </SelectList>
  );

  const toggleGroupItems = (
    <React.Fragment>
      <ToolbarGroup variant="filter-group">
        <ToolbarFilter
          chips={filters.productFamily}
          deleteChip={(category, chip) =>
            onDelete(category as string, chip as string)
          }
          deleteChipGroup={(category) => onDeleteGroup(category as string)}
          categoryName="Product Family"
        >
          <Select
            aria-label="Product Family"
            role="menu"
            toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
              <MenuToggle
                ref={toggleRef}
                onClick={onProductFamilyToggle}
                isExpanded={isProductFamilyExpanded}
                style={
                  {
                    width: '140px',
                  } as React.CSSProperties
                }
              >
                Product Family
                {filters.productFamily.length > 0 && (
                  <Badge isRead>{filters.productFamily.length}</Badge>
                )}
              </MenuToggle>
            )}
            onSelect={onProductFamilySelect}
            selected={filters.productFamily}
            isOpen={isProductFamilyExpanded}
            onOpenChange={(isOpen) => setIsProductFamilyExpanded(isOpen)}
          >
            {statusMenuItems}
          </Select>
        </ToolbarFilter>
        <ToolbarFilter
          chips={filters.risk}
          deleteChip={(category, chip) =>
            onDelete(category as string, chip as string)
          }
          categoryName="Risk"
        >
          <Select
            aria-label="Risk"
            role="menu"
            toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
              <MenuToggle
                ref={toggleRef}
                onClick={onRiskToggle}
                isExpanded={isRiskExpanded}
                style={
                  {
                    width: '140px',
                  } as React.CSSProperties
                }
              >
                Risk
                {filters.risk.length > 0 && (
                  <Badge isRead>{filters.risk.length}</Badge>
                )}
              </MenuToggle>
            )}
            onSelect={onRiskSelect}
            selected={filters.risk}
            isOpen={isRiskExpanded}
            onOpenChange={(isOpen) => setIsRiskExpanded(isOpen)}
          >
            {riskMenuItems}
          </Select>
        </ToolbarFilter>
      </ToolbarGroup>
    </React.Fragment>
  );

  const toolbarItems = (
    <React.Fragment>
      <ToolbarToggleGroup toggleIcon={<FilterIcon />} breakpoint="xl">
        {toggleGroupItems}
      </ToolbarToggleGroup>
    </React.Fragment>
  );

  return (
    <Toolbar
      id="toolbar-with-filter"
      className="pf-m-toggle-group-container"
      collapseListedFiltersBreakpoint="xl"
      clearAllFilters={() => onDelete('', '')}
    >
      <ToolbarContent>{toolbarItems}</ToolbarContent>
    </Toolbar>
  );
};
