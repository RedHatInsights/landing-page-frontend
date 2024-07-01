import React, { ChangeEvent, MouseEvent } from 'react';
import {
  Toolbar,
  ToolbarContent,
  ToolbarFilter,
  ToolbarGroup,
  ToolbarToggleGroup,
} from '@patternfly/react-core/dist/dynamic/components/Toolbar';
import {
  MenuToggle,
  MenuToggleElement,
} from '@patternfly/react-core/dist/dynamic/components/MenuToggle';
import {
  Select,
  SelectList,
  SelectOption,
} from '@patternfly/react-core/dist/dynamic/components/Select';
import FilterIcon from '@patternfly/react-icons/dist/esm/icons/filter-icon';

interface SupportCaseWidgetTableFilterProps {
  productFamily: string;
  severity: string;
  status: string;
}

export const SupportCaseWidgetTableFilter: React.FunctionComponent<
  SupportCaseWidgetTableFilterProps
> = (props) => {
  // const [isProductFamilyExpanded, setIsProductFamilyExpanded] =
  //   React.useState(false);
  const [isSeverityExpanded, setIsSeverityExpanded] = React.useState(false);
  const [isStatusExpanded, setIsStatusExpanded] = React.useState(false);

  const [filters, setFilters] = React.useState({
    // productFamily: [],
    severity: [''],
    status: [''],
  });

  const onSelect = (
    type: string,
    event: React.MouseEvent | React.ChangeEvent,
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

  // const onProductFamilySelect = (
  //   event: React.MouseEvent<Element, MouseEvent> | React.ChangeEvent<Element>,
  //   selection: string
  // ) => {
  //   onSelect('productFamily', event, selection);
  // };

  const onSeveritySelect = (
    event: MouseEvent | ChangeEvent,
    selection: string
  ) => {
    onSelect('severity', event, selection);
  };

  const onStatusSelect = (
    event: MouseEvent | ChangeEvent,
    selection: string
  ) => {
    onSelect('status', event, selection);
  };

  const onDelete = (type: string, id: string) => {
    const filterTypes: { [key: string]: string[] } = {
      // 'Product Family': filters.productFamily.filter(
      //   (fil: string) => fil !== id
      // ),
      severity: filters.severity.filter((fil: string) => fil !== id),
      status: filters.status.filter((fil: string) => fil !== id),
    };
    setFilters({
      // productFamily:
      //   type === 'Product Family' ? filterTypes[type] : filters.productFamily,
      severity: type === 'Severity' ? filterTypes[type] : filters.severity,
      status: type === 'Status' ? filterTypes[type] : filters.status,
    });
  };

  const onDeleteGroup = (type: string) => {
    const newFilters = {
      // productFamily: type === 'Product Family' ? [] : filters.productFamily,
      severity: type === 'Severity' ? [] : filters.severity,
      status: type === 'Status' ? [] : filters.status,
    };
    setFilters(newFilters);
  };

  // const onProductFamilyToggle = () => {
  //   setIsProductFamilyExpanded(!isProductFamilyExpanded);
  // };

  const onSeverityToggle = () => {
    setIsSeverityExpanded(!isSeverityExpanded);
  };

  const onStatusToggle = () => {
    setIsStatusExpanded(!isStatusExpanded);
  };

  // const productFamilyMenuItems = (
  //   <SelectList>
  //     <SelectOption
  //       hasCheckbox
  //       key={props.productFamily}
  //       value={props.productFamily}
  //       isSelected={filters.productFamily.includes(props.productFamily)}
  //     >
  //       {props.productFamily}
  //     </SelectOption>
  //   </SelectList>
  // );

  const statusMenuItems = (
    <SelectList>
      <SelectOption
        hasCheckbox
        key={props.status}
        value={props.status}
        isSelected={filters.status.includes(props.status)}
      >
        {props.status}
      </SelectOption>
    </SelectList>
  );

  const severityMenuItems = (
    <SelectList>
      <SelectOption
        hasCheckbox
        key={props.severity}
        value={props.severity}
        isSelected={filters.severity.includes(props.severity)}
      >
        {props.severity}
      </SelectOption>
    </SelectList>
  );

  const toggleGroupItems = (
    <React.Fragment>
      <ToolbarGroup variant="filter-group">
        {/* <ToolbarFilter
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
              </MenuToggle>
            )}
            onSelect={onProductFamilySelect}
            selected={filters.productFamily}
            isOpen={isProductFamilyExpanded}
            onOpenChange={(isOpen) => setIsProductFamilyExpanded(isOpen)}
          ></Select>
        </ToolbarFilter> */}
        <ToolbarFilter
          chips={filters.severity}
          deleteChip={(category, chip) =>
            onDelete(category as string, chip as string)
          }
          deleteChipGroup={(category) => onDeleteGroup(category as string)}
          categoryName="Severity"
        >
          <Select
            aria-label="Severity"
            role="menu"
            toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
              <MenuToggle
                ref={toggleRef}
                onClick={onSeverityToggle}
                isExpanded={isSeverityExpanded}
                style={
                  {
                    width: '140px',
                  } as React.CSSProperties
                }
              >
                Severity
              </MenuToggle>
            )}
            onSelect={onSeveritySelect}
            selected={filters.severity}
            isOpen={isSeverityExpanded}
            onOpenChange={(isOpen) => setIsSeverityExpanded(isOpen)}
          >
            {severityMenuItems}
          </Select>
        </ToolbarFilter>
        <ToolbarFilter
          chips={filters.status}
          deleteChip={(category, chip) =>
            onDelete(category as string, chip as string)
          }
          deleteChipGroup={(category) => onDeleteGroup(category as string)}
          categoryName="Status"
        >
          <Select
            aria-label="Status"
            role="menu"
            toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
              <MenuToggle
                ref={toggleRef}
                onClick={onStatusToggle}
                isExpanded={isStatusExpanded}
                style={
                  {
                    width: '140px',
                  } as React.CSSProperties
                }
              >
                Status
              </MenuToggle>
            )}
            onSelect={onStatusSelect}
            selected={filters.status}
            isOpen={isStatusExpanded}
            onOpenChange={(isOpen) => setIsStatusExpanded(isOpen)}
          >
            {statusMenuItems}
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
    >
      <ToolbarContent>{toolbarItems}</ToolbarContent>
    </Toolbar>
  );
};
