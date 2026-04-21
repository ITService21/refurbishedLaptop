import React, { useState, useMemo, useRef, useEffect } from "react";
import { debounce } from "lodash";
import {
  Table,
  Input,
  InputNumber,
  DatePicker,
  Select,
  Button,
  Popconfirm,
  Checkbox,
  Divider,
  Dropdown,
  Pagination,
} from "antd";
import dayjs from "dayjs";
import { DownOutlined, DownloadOutlined, RightOutlined, SearchOutlined, WindowsFilled } from "@ant-design/icons";
import  {GetIcon} from "./SvgIcon.js";
import { SvgIcon } from "./SvgIcon.js";
import {
  Devices,
  convertToISTFormatted,
  downloadCsv,
  fieldContainsValue,
  formatIndianNumber,
  getCSV,
  getDataType,
  getDateTime,
  getNestedValue,
  getObjectKeys,
  getQueries,
  getTableFilterQuery,
  makeRoundOf,
  manualFilter,
  manualSearch,
  removeUrlQuery,
  reverseISTFormatted,
  setQueries,
  universalSort,
  uppercaseFirstChar,
  textBeautifyFunction
} from "./Methods.js";
import "./styles/table.css";
import { forEach, valuesIn } from "lodash";
import {
  HtmlButton,
  HtmlDocumentModal,
  HtmlDocumentModalButtons,
  HtmlTextArea,
  openNotification,
  useUpdateUrlQuery,
  StatusBadge,
  ContentModal,
  ToggleSwitch,
  DocumentPreview,
  ExpandableTextModal
} from "./Elements.js";
import {formattedError} from "./Error.js";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import qs from "query-string";
import { getDate } from "date-fns";
const { Option } = Select;

export const textFormatterWithType = (value, type, isTimeInOptions) => {
  let v = value;
  if (!fieldContainsValue(v)) return v;
  if (getDataType(type) === "string") {
    if (type === "formatIndianNumber") {
      v = formatIndianNumber(v);
    }
  } else if (Array.isArray(type)) {
    type
      .filter((item) => typeof item === "function")
      .forEach((fn) => {
        v = fn(v);
      });
    if(type.includes('lowerCase')){
      v = v?.toLowerCase();
    }
    if (type.includes("uppercaseFirstChar")) {
      v = uppercaseFirstChar(v?.trim());
    }
    if (type.includes("removeUnderScore")) {
      v = v?.replace(/_/g, " ");
    }
    if (type.includes("removeDot")) {
      v = v?.replace(/\./g, " ");
    }
    if (type.includes("convertToISTFormatted:time")) {
      v = convertToISTFormatted(v, true);
    }
    if (type.includes("convertToISTFormatted") && !type.includes("convertToISTFormatted:time")) {
      v = convertToISTFormatted(v, false);
    }
    if (type.includes("makeRoundOf")) {
      v = makeRoundOf(v);
    }
    if (type.includes("formatIndianNumber")) {
      v = formatIndianNumber(parseInt(v));
    }
    if (type.includes("removeDash")) {
      v = v?.replace(/-/g, " ");
    }
    if(type.includes("textBeautifyFunction")){
      v = textBeautifyFunction(v)
    }
  }
  return v;
};
const handleFilterCallBack = ({ value, records, dataIndex, textFormatter }) => {
  let original = getNestedValue(records, dataIndex);

  if (fieldContainsValue(original) && textFormatter) {
    original = textFormatterWithType(original, textFormatter);
  }
  if (value === "Blank") {
    return !fieldContainsValue(original);
  } else if (value === "Non Blank") {
    return fieldContainsValue(original);
  }
  if (getDataType(value) === "string") {
    original = original?.toLowerCase();
    return original?.includes(value?.toLowerCase());
  } else if (getDataType(value) === "integer") {
    return value === parseInt(original);
  } else if (getDataType(value) === "numeric string") {
    return parseInt(value) === parseInt(original);
  }
};
export const HandleActionColum = (properties) => {
  const type = properties?.btnType || "default";
  switch (type) {
    case "discard&save":
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            justifyItems: "center",
            gap: "5px",
          }}
        >
          {!properties?.showStatus && (
            <HtmlButton
              onClick={() => {
                if (properties?.onDiscardClick) {
                  properties?.onDiscardClick({
                    text: properties?.text,
                    record: properties?.record,
                  });
                }
              }}
              disabled={properties?.discardDisabled}
              style={properties?.discardStyle}
              type={"discard"}
              text={properties?.discardText || "Discard"}
            />
          )}
          {!properties?.showStatus && (
            <HtmlButton
              onClick={() => {
                if (properties?.onSaveClick) {
                  properties?.onSaveClick({
                    text: properties?.text,
                    record: properties?.record,
                  });
                }
              }}
              disabled={properties?.saveDisabled}
              style={properties?.saveStyle}
              type={"save"}
              text={properties?.saveText || "Save"}
            />
          )}
          {properties?.showStatus && (
            <StatusBadge status={properties?.status} className="w-full" />
          )}
        </div>
      );
    case "editableMode":
      break;
    default:
      break;
  }
};
export const CommonFilterDropdown = ({
  setSelectedKeys,
  selectedKeys,
  confirm,
  clearFilters,
  dataIndex,
  key,
  dataSource = [],
  enableSearch = true,
  enableSorting = true,
  enableBlankOptions = true,
  enableOptionsList = true,
  onSort = () => { },
  placeholder = "",
  optionsSortType = "ascending",
  textFormatter,
  inputType,
  setSortOrder = () => { },
}) => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const allOptions = useMemo(() => {
    let values = dataSource.map((item) => {
      return getNestedValue(item, dataIndex);
    });
    values = universalSort(values, optionsSortType);
    values = values?.filter((item) => {
      if (Array.isArray(item)) {
        return (
          item.length > 0 &&
          item[0] !== null &&
          item[0] !== undefined &&
          item[0] !== NaN
        );
      }
      return item !== null && item !== undefined;
    });
    const unique = Array.from(new Set(values));
    return unique.map((value) => value ?? "Blank");
  }, [dataIndex, dataSource]);
  // const filteredOptions = useMemo(() => {
  //   return allOptions.filter((val) =>
  //     val.toString().toLowerCase().includes(searchText.toLowerCase())
  //   );
  // }, [searchText, allOptions]);
  const filteredOptions = useMemo(() => {
    const searchTerms = searchText
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);
    if (searchTerms.length === 0) {
      return allOptions;
    }
    let exactMatches = allOptions.filter((val) => {
      let valueStr = val?.toString().toLowerCase();
      return searchTerms.some((term) => valueStr.includes(term));
    });
    exactMatches = exactMatches?.map((item) => {
      if (textFormatter) {
        let i = textFormatterWithType(item, textFormatter);
        i = i?.trim();
        return i;
      } else {
        return item;
      }
    });
    // console.log(exactMatches,textFormatterWithType(exactMatches[0],textFormatter))
    setSelectedKeys(exactMatches);
    return exactMatches;
  }, [searchText, allOptions]);
  const handleCheckboxChange = (checkedValues) => {
    let next = [...checkedValues];

    if (next.includes("Blank") && next.includes("Non Blank")) {
      // Keep only the last one between "Blank" and "Non Blank"
      const lastSelected = checkedValues.findLast(
        (val) => val === "Blank" || val === "Non Blank"
      );

      next = checkedValues.filter(
        (val) => val !== "Blank" && val !== "Non Blank"
      );

      next.push(lastSelected);
    }

    setSelectedKeys(next);
  };
  // const handleSorting = (order)=>{
  //   let queryString = qs.stringify({sortKey:dataIndex,sortOrder:order},{encode:false})
  //   navigate(queryString ? `?${queryString}` : '', { replace: true });
  // }
  const handleSorting = (order) => {
    const currentQuery = qs.parse(location.search); // get current query params
    const updatedQuery = {
      ...currentQuery,
      sortKey: key,
      sortOrder: order,
    };


    const queryString = qs.stringify(updatedQuery, { encode: false });
    navigate(`?${queryString}`, { replace: true });
  };
  return (
    <div style={{ padding: 8, width: 200, borderRadius: "16px" }}>
      {/* {(
          <div
            style={{
              borderBottom: "solid",
              borderBottomWidth: "1px",
              borderColor: "gray",
            }}
            className="mb-2 pl-2 text-gray-800 "
          >
            <p
              className="pb-2 cursor-pointer"
              onClick={() => {
                // setOrder("ascend");
                handleSorting('asc')
              }}
            >
              Sort Ascending Order
            </p>
            <p
              className="pb-2 cursor-pointer"
              onClick={() => {
                // setOrder("descend");
                handleSorting('desc')
              }}
            >
              Sort Descending Order
            </p>
          </div>
        )} */}
      {enableSearch && (
        <Input
          type={inputType ? inputType : "text"}
          onWheel={(e) => {
            if (inputType === "number") {
              e.target.blur();
            }
          }}
          placeholder={placeholder}
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          style={{ marginBottom: 8, display: "block", height: "4%" }}
        />
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 8,
        }}
      >
        <Button
          type="primary"
          size="small"
          style={{ width: 90 }}
          onClick={() => confirm()}
        >
          Search
        </Button>
        <Button
          size="small"
          style={{ width: 90 }}
          onClick={() => {
            clearFilters();
            setSearchText("");
            confirm();
          }}
        >
          Reset
        </Button>
      </div>

      {enableOptionsList && (
        <div
          style={{ maxHeight: 200, overflowY: "auto", marginBottom: 8 }}
          className="custom-scrollbar"
        >
          <Checkbox.Group
            style={{ display: "flex", flexDirection: "column" }}
            value={selectedKeys}
            onChange={handleCheckboxChange}
          >
            {enableBlankOptions && (
              <>
                <Checkbox value="Blank">Blank</Checkbox>
                <Checkbox value="Non Blank">Non Blank</Checkbox>
              </>
            )}
            {[
              ...new Set(
                filteredOptions?.map((item) => {
                  let v = item;
                  if (fieldContainsValue(v) && textFormatter) {
                    v = textFormatterWithType(v, textFormatter);
                  }
                  return v;
                })
              ),
            ].map((option) => {
              if (
                enableBlankOptions &&
                (option === "Blank" || option === undefined)
              )
                return null;
              return (
                <Checkbox key={option} value={option}>
                  {option}
                </Checkbox>
              );
            })}
          </Checkbox.Group>
        </div>
      )}
    </div>
  );
};
const ActionPopup = ({ properties }) => {
  const [discardSaveLoading, setDiscardSaveLoading] = useState(false);
  const [data, setData] = useState({});
  useEffect(() => {

    setDiscardSaveLoading(properties?.discardSaveLoading);
  }, [properties]);

  const a = {
    HtmlTextArea: {},
    input: {},
    p: {},
  };
  const fields = properties?.fields || [];
  const onSave = (type) => {
    setDiscardSaveLoading(true);
    if (properties?.onBtnsClick) {
      properties?.onBtnsClick(
        `${properties?.type}:${type}`,
        data,
        properties?.record
      );
    }
    setDiscardSaveLoading(false);
  };
  const handleChange = (name, value) => {
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setDiscardSaveLoading(false);
    if (properties?.onDiscardFieldsChange) {
      properties?.onDiscardFieldsChange(name, value);
    }
  };

  const fieldsOptions = [];
  fields.forEach((element) => {
    const key = element?.type;
    switch (key) {
      case "HtmlTextArea":
        fieldsOptions?.push(
          <HtmlTextArea
            value={data[element?.name]}
            allTimeEditMode={true}
            onChange={(e) => {
              handleChange(e.target.name, e.target?.value);
            }}
            {...element}
          />
        );
        break;
      case "ToggleSwitch":
        fieldsOptions?.push(
          <div className="flex items-center gap-2 mb-4">
            {element?.label && <span>{element?.label}</span>}
            <ToggleSwitch
              checked={data[element?.name]}
              onChange={(e) => {
                handleChange(element?.name, e);
              }}
              {...element}
            />
          </div>
        );
      case "p":
        fieldsOptions?.push(<p {...element}>{element?.text}</p>);
        break;
      default:
        break;
    }
  });

  const onClose = () => {
    if (properties?.onClose) {
      properties?.onClose();
    }
    setDiscardSaveLoading(false);
    setData((prev) => {
      const cleared = Object.fromEntries(
        Object.keys(prev).map((key) => [key, ""])
      );
      return cleared;
    });
  };
  return (
    <ContentModal
      open={properties?.open}
      title={properties?.title}
      close={onClose}
      mask={properties?.mask}
      width={properties?.width || "auto"}
      element={
        <div>
          <div>
            {/* show input fields here  */}
            {fieldsOptions?.map((item, index) => {
              return item;
            })}
          </div>
          <div
            id="popup-footer"
            className="flex justify-end items-center gap-4"
          >
            <HtmlButton
              onClick={onClose}
              type={"discard"}
              text={properties?.discardText || "discard"}
            />
            <HtmlButton
              onClick={() => {
                onSave("save");
              }}
              type={"save"}
              text={properties?.saveText || "save"}
              loading={discardSaveLoading}
            />
          </div>
        </div>
      }
    />
  );
};
const serializeFilters = (filters) => {
  const parts = Object.entries(filters)
    .filter(([_, val]) => val !== undefined && val !== null && val.length > 0)
    .map(([key, val]) => {
      const v = Array.isArray(val) ? val.join("|") : val;
      return `${key}:${v}`;
    });
  return `(${parts.join(",")})`;
};
const parseFiltersFromString = (filterString) => {
  if (
    !filterString ||
    !filterString.startsWith("(") ||
    !filterString.endsWith(")")
  )
    return {};
  const body = filterString.slice(1, -1);
  const pairs = body.split(",").map((p) => p.trim());
  const result = {};
  pairs.forEach((pair) => {
    const [key, val] = pair.split(":");
    if (val?.includes("|")) {
      result[key] = val.split("|");
    } else {
      result[key] = [val];
    }
  });
  return result;
};
export const TableBE = ({
  dataSource = [],
  columns = [],
  stickyHeader = false,
  showFilters = true,
  pageSize = 10,
  setSortInfo = () => { },
  onSave = () => { },
  pagination = {},
  deleteAble = false,
  errorMessage,
  loading,
  actions = true,
  actionsProperties = {},
  customAction,
  onChange = () => { },
  //please do not add default function () => {} in extraProperties, it is ok do not change anything here
  extraProperties,
  type, // basic,be
  rowKey,
  rowClassName,
  rowSelection,
  paginationUpGap=60,
  filtersFunction,
  on_filter_search_hit_api=true,
  filterOptionsFooter = false,
  sorting = false
}) => {
  const [editingKey, setEditingKey] = useState(null);
  const [formData, setFormData] = useState({});
  const [updateFormData, setUpdateFormData] = useState({});
  const tableContainerRef = useRef(null);
  const [tableContainerHeight, setTableContainerHeight] = useState(1000);
  const [tableContainerWidth, setTableContainerWidth] = useState(null);
  const [actionPopupProperties, setActionPopupProperties] = useState({});
  const [devices, setDevices] = useState("");
  const [isSmallDevice, setIsSmallDevice] = useState(window.innerWidth < 768);
  const location = useLocation();
  const navigate = useNavigate();
  const [filterValues, setFilterValues] = useState({});
  const [imagePopupProperty, setImagePopupProperty] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const urlQueries = getQueries()
  const [page,setPage] = useState(1)
  const [page_size,set_page_size] = useState(10)
  // console.log(selectedRowKeys,'bashar_selectedRowKeys')
  useEffect(()=>{
   
    setSelectedRowKeys([])
  },[dataSource])

  useEffect(() => {
    if (tableContainerRef.current) {
      const height = tableContainerRef.current.clientHeight;
      setTableContainerHeight(height);
      setTableContainerWidth(tableContainerRef.current.clientWidth);

    }
    const handleResize = () => {
      setDevices(Devices());
      setIsSmallDevice(Devices("s-m"));
      if (tableContainerRef.current) {
        setTableContainerHeight(tableContainerRef.current.clientHeight);
        setTableContainerWidth(tableContainerRef.current.clientWidth);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {

    const queryParams = qs.parse(location.search);

    const restored = parseFiltersFromString(queryParams.filters);
    setFilterValues(restored);

    if (queryParams.sortKey && queryParams.sortOrder) {
      setSortInfo({
        columnKey: queryParams.sortKey,
        order: queryParams.sortOrder,
      });
    } else {
      setSortInfo({});
    }
    if ((!queryParams?.page || !queryParams?.pageSize) && pagination !== false && type !== 'basic') {
      let url = updateUrlQuery({ page: pagination?.page || 1, pageSize: pageSize || 10 });
      navigate(url, { replace: true });
    }
    setPage(queryParams?.page)
    set_page_size(queryParams?.pageSize)
    onChange({ filters: restored });
  }, [location.search]);

  const isEditing = (record) => record.id === editingKey;

  const handleEdit = (record) => {
    setFormData(record);
    setEditingKey(record.id);
    setUpdateFormData({ id: record?.id });
  };

  const handleSave = (record) => {
    // You can call API or update state here
    // console.log("Saved Data:", formData);
    onSave(updateFormData, record);
    setEditingKey(null);
  };

  const handleCancel = () => {
    setEditingKey(null);
  };

  const handleDelete = (key) => {

    // Delete logic goes here
  };

  const getColumnFilters = (dataIndex) => {
    const uniqueValues = [
      ...new Set(dataSource.map((item) => item[dataIndex])),
    ];
    return uniqueValues.map((val) => ({
      text:
        val === undefined || val === null || val === ""
          ? "Blank"
          : val.toString(),
      value: val === undefined || val === null ? "__BLANK__" : val,
    }));
  };

  const getFilterDropdown =
    (dataIndex) =>
      ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) =>
      (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={confirm}
            style={{ marginBottom: 8, display: "block" }}
          />
          <div style={{ display: "flex", gap: 8 }}>
            <Button
              type="primary"
              onClick={confirm}
              size="small"
              style={{ width: 70 }}
            >
              Search
            </Button>
            <Button onClick={clearFilters} size="small" style={{ width: 70 }}>
              Reset
            </Button>
          </div>
        </div>
      );

  const handleImagePreview = (title, text, record, download) => {

    setImagePopupProperty({
      open: true,
      documentName: title,
      download: download,
      url: text,
    });
  };
  const mergedColumns = [
    ...columns.map((col) => {
      const { editable, inputType, options } = col;
      let useFilters = showFilters 
      if(col.hasOwnProperty('filter')){
        useFilters = col?.filter
      }
      return {
        ...col,
        fixed: !isSmallDevice ? col?.fixed : null,
        ...(useFilters && {
          filterIcon: (filtered) => {
            if (type === 'be') {
              let existing = getFiltersUrl()
              let sorting = getQueries()
              if (existing?.obj[col?.key]?.length > 0) {
                return <FilterIcon filtered={true} />
              }
              if(sorting && sorting?.sort && sorting?.sort?.split(':')[0] === col?.key){
                return <FilterIcon filtered={true} />
              }
            }
            return <FilterIcon filtered={filtered} />
          },
          filterDropdown: col?.filterDropdown
            ? col?.filterDropdown
            : type === 'be' ? (props) => {
              let filter = col?.filterProperties;
              let ctf = col?.textFormatter || [];
              return <CommonBeFilterDropdown
                {...props}
                // dataSource={dataSource}
                dataIndex={col?.dataIndex}
                key={col?.key}
                // enableSearch={filter?.enableSearch || true}
                enableSearch={filter?.enableSearch !== undefined ? filter.enableSearch : true}
                enableOptionsList={filter?.enableOptionsList}
                enableSorting={filter?.enableSorting || true}
                enableBlankOptions={filter?.enableBlankOptions}
                placeholder={`Search ${filter?.placeholder ||
                  uppercaseFirstChar(col?.title?.toLowerCase())
                  }`}
                optionsSortType={filter?.optionsSortType}
                textFormatter={
                  filter?.textFormatter
                    ? [...ctf, ...filter?.textFormatter]
                    : ctf
                }
                filtersFunction={filtersFunction}
                inputType={col?.type || "text"}
                col={col}
                on_filter_search_hit_api={on_filter_search_hit_api}
                optionsFooter={filterOptionsFooter}
                sorting={sorting}
                filterOptionPageSize={pageSize}
              />
            } : (props) => {
              let filter = col?.filterProperties;
              let ctf = col?.textFormatter || [];
              return (
                <CommonFilterDropdown
                  {...props}
                  dataSource={dataSource}
                  dataIndex={col?.dataIndex}
                  key={col?.key}
                  // enableSearch={filter?.enableSearch || true}
                  enableSearch={filter?.enableSearch !== undefined ? filter.enableSearch : true}
                  enableOptionsList={filter?.enableOptionsList || true}
                  enableSorting={filter?.enableSorting || true}
                  enableBlankOptions={filter?.enableBlankOptions}
                  placeholder={`Search ${filter?.placeholder ||
                    uppercaseFirstChar(col?.title?.toLowerCase())
                    }`}
                  optionsSortType={filter?.optionsSortType}
                  textFormatter={
                    filter?.textFormatter
                      ? [...ctf, ...filter?.textFormatter]
                      : ctf
                  }
                  inputType={col?.type || "text"}
                />
              );
            },
          onFilter: (value, records) => {
            let filter = col?.filterProperties;
            let ctf = col?.textFormatter || [];
            return handleFilterCallBack({
              value,
              records,
              dataIndex: col?.dataIndex,
              textFormatter: filter?.textFormatter
                ? [...ctf, ...filter?.textFormatter]
                : ctf,
            });
          },
          filteredValue: filterValues?.[col?.key] || null,
        }),

        ...(!col?.render && {
          render: (text, record) => {
            const editableMode = isEditing(record);
            if (editable && editableMode) {
              switch (inputType) {
                case "number":
                  return (
                    <InputNumber
                      value={formData[col.dataIndex]}
                      onChange={(value) => {
                        if (typeof extraProperties === "function") {
                          const updatedObj = extraProperties(
                            formData,
                            col?.dataIndex,
                            value
                          );

                          if (Object.keys(updatedObj).length > 0) {
                            setFormData({ ...formData, ...updatedObj });
                            setUpdateFormData({
                              ...updateFormData,
                              ...updatedObj,
                            });
                          } else {
                            return;
                          }
                        } else {
                          setFormData({ ...formData, [col.dataIndex]: value });
                          setUpdateFormData({
                            ...updateFormData,
                            [col.dataIndex]: value,
                          });
                        }
                      }}
                    />
                  );
                case "date":
                  return (
                    <DatePicker
                      value={
                        formData[col.dataIndex]
                          ? dayjs(formData[col.dataIndex])
                          : null
                      }
                      onChange={(date, dateString) =>
                        setFormData({
                          ...formData,
                          [col.dataIndex]: dateString,
                        })
                      }
                    />
                  );
                case "select":
                  return (
                    <Select
                      value={formData[col.dataIndex]}
                      onChange={(value) =>
                        setFormData({ ...formData, [col.dataIndex]: value })
                      }
                      style={{ width: "100%" }}
                    >
                      {options?.map((opt) => (
                        <Option key={opt.value} value={opt.value}>
                          {opt.label}
                        </Option>
                      ))}
                    </Select>
                  );
                case "button":
                  return <Button>{col.buttonText || "Action"}</Button>;
                default:
                  return (
                    <Input
                      value={formData[col.dataIndex]}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [col.dataIndex]: e.target.value,
                        })
                      }
                    />
                  );
              }
            } else {
              let v = text;
              if (col?.textFormatter) {
                v = textFormatterWithType(v, col?.textFormatter);
              }
              if (col?.renderAfterFormatter) {
                return col?.renderAfterFormatter(col.title, v, record);
              }
              if (col?.type) {
                if (col?.type?.includes("images:")) {
                  return text && Array.isArray(v) && v?.length > 0 ? (
                    <span
                      onClick={() => {
                        handleImagePreview(
                          col.title,
                          text,
                          record,
                          col?.type?.includes(":true")
                        );
                      }}
                      className="text-green-500 underline cursor-pointer"
                    >
                      View
                    </span>
                  ) : (
                    "-"
                  );
                } else if (col?.type?.includes("status")) {
                  return fieldContainsValue(text) ? (
                    <StatusBadge status={v} />
                  ) : (
                    "-"
                  );
                } else if (col?.type?.includes("remark")) {
                  return text ? <ExpandableTextModal remarks={text} /> : "-";
                }
              }
              return v !== undefined && v !== null ? (
                <span
                  className={`${col?.class} `}
                  onClick={() => {
                    if (col?.onClick) {
                      col?.onClick(text, record);
                    }
                  }}
                >
                  {v}
                </span>
              ) : (
                "-"
              );
            }
          },
        }),
      };
    }),
    {
      title: "Actions",
      dataIndex: "actions",
      // fixed: "right",
      fixed: !isSmallDevice ? "right" : null,
      width: actionsProperties?.column_width||180,
      align: "center",
      hidden: !actions,
      render: (text, record) => {
        const editableMode = isEditing(record);
        if (!fieldContainsValue(customAction)) {
          return editableMode ? (
            <div
              style={{ display: "flex" }}
              className=" items-center text-center flex justify-center"
            >
              <Button
                type="link"
                onClick={() => {
                  handleSave(record);
                }}
              >
                <SvgIcon color="green" type="save-icon" />
              </Button>
              <Button type="link" onClick={handleCancel}>
                <SvgIcon color="#DD3223" type="delete" />
              </Button>
            </div>
          ) : (
            <div
              style={{ display: "flex" }}
              className=" items-center text-center flex justify-center"
            >
              <Button
                style={{
                  color: "#4318FF",
                  ...(actionsProperties?.saveDisabled &&
                    getDataType(actionsProperties?.saveDisabled) ===
                    "function" &&
                    actionsProperties?.saveDisabled(text, record) && {
                    color: "grey",
                    cursor: "not-allowed",
                  }),
                }}
                // disabled={()=>{
                //   if(actionsProperties?.saveDisabled && getDataType(actionsProperties?.saveDisabled)==="function"){
                //     actionsProperties?.saveDisabled(text, record);
                //   }
                // }}
                disabled={
                  actionsProperties?.saveDisabled &&
                  getDataType(actionsProperties?.saveDisabled) === "function" &&
                  actionsProperties?.saveDisabled(text, record)
                }
                type="link"
                onClick={() => handleEdit(record)}
              >
                <SvgIcon type="edit" />
              </Button>
              {deleteAble && (
                <Popconfirm
                  title="Sure to delete?"
                  onConfirm={() => handleDelete(record.id)}
                >
                  <Button type="link" danger>
                    <SvgIcon color="#DD3223" type="dustbin" />
                  </Button>
                </Popconfirm>
              )}
            </div>
          );
        }
        if (customAction) {
          return customAction(text, record);
        }
        return (
          <HandleActionColum
            properties={{
              ...actionsProperties,
              value: text,
              records: record,
              editableMode,
              onBtnClick: (data) => {
                let popUpProperties = {};
                if (actionsProperties?.onBtnClick) {
                  popUpProperties = actionsProperties?.onBtnClick(
                    data?.type,
                    text,
                    record
                  );
                  setActionPopupProperties({
                    open: true,
                    ...popUpProperties,
                    record: record,
                    type: data?.type,
                  });
                }
              },
            }}
          />
        );
      },
    },
  ];

  // const handleTableChange = (pagination, filters, sorter) => {
  //   // Clean filters to include only valid values
  //   const cleanedFilters = Object.entries(filters).reduce((acc, [key, val]) => {
  //     if (val && val.length > 0) {
  //       acc[key] = val;
  //     }
  //     return acc;
  //   }, {});
  //   setFilterValues(cleanedFilters)
  //   const serialized = serializeFilters(cleanedFilters);
  //   const query = {
  //     filters: serialized,
  //     sortKey: sorter?.columnKey || "",
  //     sortOrder: sorter?.order || "",
  //   };
  //   const queryString = qs.stringify(query, { encode: false }); // prevent double encoding
  //   navigate(`?${queryString}`);
  //   setSortInfo({
  //     columnKey: sorter?.columnKey,
  //     order: sorter?.order,
  //   });
  // };
  const handleTableChange = (pagination, filters, sorter, extra) => {
    // Clean filters to include only valid values
   
    const cleanedFilters = Object.entries(filters).reduce((acc, [key, val]) => {
      if (val && val.length > 0) {
        acc[key] = val;
      }
      return acc;
    }, {});

    // Update local state
    setFilterValues(cleanedFilters);
    setSortInfo({
      columnKey: sorter?.columnKey,
      order: sorter?.order,
    });

    // Create final query
    const query = {};

    if (Object.keys(cleanedFilters).length > 0) {
      query.filters = serializeFilters(cleanedFilters);
    }

    if (sorter?.columnKey && sorter?.order) {
      query.sortKey = sorter.columnKey;
      query.sortOrder = sorter.order;
    }
    if(pagination && type !== 'basic'){
      query.page = pagination.current || 1;
      query.pageSize = pagination.pageSize || pageSize;
    }

    const queryString = qs.stringify(query, { encode: false });
    console.log('bashar table is changed ',pagination,queryString)
    // Replace URL without pushing new history entry
    onChange({ filters: cleanedFilters, data: extra?.currentDataSource || [], pagination: pagination });
    if(type !== "basic"){
      navigate(queryString ? `?${queryString}` : "", { replace: true }); 
    }
  };
  const row_selection = {
    type: rowSelection?.type||"checkBox",
    selectedRowKeys,
    onChange: (selectedKeys) => {
      setSelectedRowKeys(selectedKeys); 
      if(rowSelection?.onChange){
        rowSelection?.onChange(selectedKeys);
      }
    },
    getCheckboxProps: (record) => ({
      ...(rowSelection?.getCheckboxProps && rowSelection?.getCheckboxProps(record)),
      // disabled: record?.status.toLowerCase() !== "pending", // Disable checkbox for rows where age is less than 40
    }),
  };
  return (
    <div className="temp" ref={tableContainerRef} style={{ height: "100%", maxHeight: "100%" }}>
      <DocumentPreview
        open={imagePopupProperty?.open}
        title={imagePopupProperty?.documentName}
        download={imagePopupProperty?.download}
        url={imagePopupProperty?.url}
        close={() => {
          setImagePopupProperty({});
        }}
      />
      <Table
        className="editableTable mb-0"
        rowKey={rowKey?rowKey:'id'}
        rowClassName={rowClassName}
        rowSelection={rowSelection?row_selection:null}
        dataSource={dataSource}
        columns={mergedColumns}
        // scroll={stickyHeader ? { y: tableContainerHeight - 115 } : undefined}
        scroll={stickyHeader ? { y: tableContainerHeight - paginationUpGap } : undefined}
        sortDirections={["ascend", "descend"]}
        // onChange={(pagination, filters, sorter) => {
        //   setSortInfo({
        //     columnKey: sorter.columnKey,
        //     order: sorter.order,
        //   });
        // }}
        onChange={handleTableChange}
        loading={loading}
        {...(type !== 'basic' && {
          pagination:
            type !== 'be' && pagination !== false
              ? {
                  size: window.innerWidth <= 768 ? 'small' : 'default',
                  pageSize: page_size,
                  showSizeChanger: true,
                  showQuickJumper: false,
                  showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
                  current: page,
                  pageSizeOptions: ['10', '20', '50', '100'],
                  position: ['bottomCenter'],
                  ...pagination,
                }
              : false,
        })}
        {
          ...(type ==='basic'&&{
            pagination:{
              position: ["bottomCenter"],
              showSizeChanger: false,
              ...pagination

            }
          })
        }
        locale={{
          emptyText: (
            <div
              style={{
                position: "fixed",
                height: `${tableContainerHeight - 80}px`, // adjust based on your needs
                width: tableContainerWidth - 35,
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
                // backgroundColor:"red",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {!errorMessage &&
                (loading
                  ? "Hold on! We're loading your data."
                  : " Oops No Data Found !")}
              {errorMessage && errorMessage}
            </div>
          ),
        }}
      />
      {type === "be" && <Pagination
        size={window.innerWidth <= 768 ? "small" : "default"}
        current={urlQueries?.page || 1}
        pageSize={urlQueries?.pageSize || 10}
        showSizeChanger={true}
        showQuickJumper={false}
        showTotal={(total, range) => `${range[0]}-${range[1]} of ${total}`}
        pageSizeOptions={["10", "15", "20", "50", '100']}
        onChange={(newPage, newPageSize) => {
          let url = updateUrlQuery({ page: newPage, pageSize: newPageSize });
          navigate(url, { replace: true });

        }}
        {...pagination}
        style={{ marginTop: '0px', textAlign: "center" }}
        className="editableTablePagination"
      />
      }
    </div>
  );
};

const FilterIcon = ({ filtered }) => {
  return <SvgIcon type={filtered ? "filter-icon-on" : "filter-icon-off"} />;
};

export const TableSearchSection = ({
  columns,
  data = [],
  onSearch = () => { },
  tableId = "",
  onCsvDownload,
  csvTitle,
  csvDownload = true,
  type = "default",
  rightChild,
  pageSize=20
 
}) => {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState({
    key: null,
    label: null,
  });
  const location = useLocation();
  const STORAGE_KEY = "TableSearchSectionSearchKey";
  const [csvDownloadLoading, setCsvDownloadLoading] = useState(false);
  // const [csvData, setCsvData] = useState([]);
  const csvData = useMemo(() => {
    const queryParams = qs.parse(location.search);
    const restored = parseFiltersFromString(queryParams.filters);
    return manualFilter({ filters: restored, data, columns });
  }, [location.search, data, columns]);
  const debouncedSearch = useRef(
    debounce((data) => {
      if (type === "default") {
        let filteredData = manualSearch(data);
        onSearch(filteredData);
      } else {
        let key = data?.key
        let value = data?.value
        value = value?.split(', ')
        let query = ``
        value?.forEach(item => {
          if (fieldContainsValue(item) && item !== '') {
            query += `&${key}=${item}`
          }
        })
        setQueries({page:1,pageSize:pageSize,})
        onSearch(data, query);
      }
    }, 300) // 300ms debounce delay
  ).current;
  useEffect(() => {
    if (columns && Array.isArray(columns)) {
      const c = getOptionsFromColumns(columns);
      setOptions(c);

      let storedOption = null;

      try {
        const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
        if (parsed?.table_id === tableId) {
          storedOption = parsed?.option;
        }
      } catch (err) {
        storedOption = null;
      }

      const isValidOption =
        storedOption && c.some((opt) => opt.key === storedOption.key);

      if (isValidOption) {
        setSelectedOption(storedOption);
      } else {
        setSelectedOption(c[0]);
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            table_id: tableId,
            option: c[0],
          })
        );
      }
    }
  }, [columns]);
  // useEffect(() => {
  //   if(data && Array.isArray(data) ){
  //     setCsvData(data);
  //   }
  // }, [data]);
  // useEffect(() => {
  //   const queryParams = qs.parse(location.search);
  //   const restored = parseFiltersFromString(queryParams.filters);
  //   let e = manualFilter({ filters: restored, data: data, columns: columns });
  //   setCsvData(e);
  // }, [location.search, data]);
  const getOptionsFromColumns = (columns) => {
    let c = columns;
    c = c.filter((item) => {
      if (c.hasOwnProperty("show") && !c.show) {
        return false;
      }
      return item.search;
    });
    c = c.map((item) => {
      let key = item?.key;
      if(item?.searchKey){
        key = item?.searchKey
      }
      if (Array.isArray(key)) {
        key = key.join(".");
      }
      return {
        key: key,
        label: uppercaseFirstChar(item?.title?.toLowerCase()),
      };
    });
    return c;
  };
  const handleSearchSelect = (e) => {
    const selected = options.find((option) => option?.key === e?.key);
    if (selected) {
      const newOption = { key: selected.key, label: selected.label };
      setSelectedOption(newOption);
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ table_id: tableId, option: newOption })
      );
    }
  };
  const onInput = (e) => {
    let value = e?.target?.value?.toLowerCase();
    // let filteredData = manualSearch({data,value,key:selectedOption?.key})
    debouncedSearch({ data, value, columns, ...selectedOption });
  };
  useEffect(() => {
    return () => {
      // Clean up debounce on unmount
      debouncedSearch.cancel();
    };
  }, []);
  const generateCsv = (data, columns, fileName = "data") => {
    let filteredColumns = columns?.filter((item) => {
      if (item.hasOwnProperty("show")) {
        return item?.show && item.csv;
      }
      return item.csv;
    });
    if (filteredColumns?.length === 0) {
      openNotification({
        type: "error",
        message: "Unable to download.",
        description: "There is no columns to download",
      });
      return 0;
    }
    if (data?.length === 0) {
      openNotification({
        type: "error",
        message: "Unable to download.",
        description: "There is no data to download",
      });
      return 0;
    }
    setCsvDownloadLoading(true);
    try {
      let transformedData = data?.map((item, index) => {
        let updatedItem = {};
        filteredColumns?.map((col) => {
          let title = col?.title;
          let dataIndex = col?.dataIndex;
          let value = getNestedValue(item, dataIndex);
          if (col?.textFormatter) {
            value = textFormatterWithType(value, col?.textFormatter);
          }
          updatedItem[title] = value;
        });

        return updatedItem;
      });
      let name = `${fileName} ${getDateTime(true, true, "yyyy-mm-dd")}`;
      getCSV(transformedData, name, true);
    } catch (error) {
      let message = formattedError(error);
      openNotification({
        type: "info",
        message: "Unable to download.",
        description: message,
      });
    }
    setCsvDownloadLoading(false);
  };
  const handleMannualDownload = async()=>{
    setCsvDownloadLoading(true);
    try {
      let result = await onCsvDownload();
          const blob = await result.blob();
          const csvUrl = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = csvUrl;
          let name = csvTitle;
          let date = getDateTime(true, true, "yyyy-mm-dd");
          name += ` (${date}).csv`;
          name = name?.replaceAll(":", "-");
          link.download = name;
          link.click();
    } catch (error) {
      let message = formattedError(error);
      openNotification({
        type: "info",
        message: "Unable to download.",
        description: message,
        duration:0
      });
    }
    setCsvDownloadLoading(false);
  }
  return (
    <div
      className="justify-between"
      style={{
        // backgroundColor: "white",
        width: "100%",
        height: "34px",
        maxHeight: "5.5%",
        // marginBottom: "1.8%",
        display: "flex",
        alignItems: "center",
        // justifyContent:"space-between"
      }}
    >
      <div
        id="table search container"
        style={{
          border: "solid",
          // borderColor: "#DBDADE",
          borderColor:"#8471f2",
          borderRadius: "16px",
          height: "34px",
          width: "20%",
          minWidth: "130px",
          overflow: "hidden",
          display: "flex",
          backgroundColor: "white",
        }}
      >
        <input
          onChange={onInput}
          className="placeholder:text-[14px] text-[14px] "
          placeholder={`Search ${selectedOption?.label
            ? "by " + selectedOption?.label?.toLowerCase()
            : ""
            }`}
          style={{
            height: "100%",
            outline: "none",
            paddingLeft: "12px",
            width: "82%",
            color: "gray",
           
          }}
        />
        <Dropdown
          overlayClassName="max-h-[50vh] overflow-y-auto shadow-lg custom-scrollbar"
          menu={{
            items: options,
            onClick: handleSearchSelect,
          }}
          trigger={["click"]}
        >
          <button
            style={{
              // border:"none",
              borderLeft: "solid",
              // borderColor: "#DBDADE",
              borderColor:"#8471f2",
              // backgroundColor:"red",
              height: "100%",
              padding: "5px",
            }}
          >
            <SvgIcon size="25" 
            // color="#706b7d" 
            color="#8471f2"
            type="down-arrow-point" />
          </button>
        </Dropdown>
      </div>
      <div
        className="flex items-center justify-end gap-1"
        style={{
          width: "80%",
          height: "99%",
          // backgroundColor:"red"
        }}
      >
        {rightChild}
        {csvDownload && <HtmlButton
          onClick={() => {

            if (onCsvDownload) {
              handleMannualDownload()
            } else {
              generateCsv(csvData, columns, csvTitle);
            }
          }}
          style={{
            // borderColor: "#5537ff",
            // borderRadius: "18px",
            // color: "#5537ff",
            // color: 'gray',
            // height: "99%",
          }}
          outline={true}
          svgPosition="left"
          svgType={"download"}
          type={"save"}
          loading={csvDownloadLoading}
          text={<span className="hidden md:block">CSV</span>}
        />}
      </div>
    </div>
  );
};


// export const TableSummary = ({
//   dataList,
//   summaryCheckBoxValue,
//   onSummaryChange = () => {},
//   type = "checkbox",
//   loading,
// }) => {
//   const [showAll, setShowAll] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const containerRef = useRef(null);
//   const moreButtonRef = useRef(null);

//   const filteredDataList = Array.isArray(dataList)
//     ? dataList.filter((item) => item.className !== "hidden")
//     : [];

//   const [visibleCount, setVisibleCount] = useState(filteredDataList.length);
//   const [initialVisibleCount, setInitialVisibleCount] = useState(
//     filteredDataList.length
//   );

//   const visibleCards = showAll
//     ? filteredDataList
//     : filteredDataList.slice(0, visibleCount);

//   const remainingCount = filteredDataList.length - initialVisibleCount;

//   // const checkVisibleCount = () => {
//   //     if (showAll) return;

//   //     if (containerRef.current && moreButtonRef.current) {
//   //       const containerWidth = containerRef.current.offsetWidth - 48;
//   //       const moreBtnWidth = moreButtonRef.current.offsetWidth;
//   //       let totalWidth = 0;
//   //       let count = 0;
//   //       const cardWidths = Array.from(containerRef.current.children)
//   //         .filter(
//   //           (child) =>
//   //             !child.dataset.ignore && !child.classList.contains("hidden")
//   //         )
//   //         .map((child) => child.offsetWidth + 8);
//   //       for (let width of cardWidths) {
//   //         totalWidth += width;
//   //         if (totalWidth + moreBtnWidth > containerWidth) break;
//   //         count++;
//   //       }
//   //       setVisibleCount(count);
//   //       setInitialVisibleCount(count); // store initial count
//   //     }
//   //   };

//   useEffect(() => {
//     setIsLoading(loading);
//   }, [loading]);

//   // useEffect(() => {
//   //   checkVisibleCount();
//   //   console.log(visibleCount, "visibleCount")
//   //   window.addEventListener("resize", checkVisibleCount);
//   //   return () => window.removeEventListener("resize", checkVisibleCount);
//   // }, [dataList]);

//   //   useEffect(() => {
//   //   if (!showAll) {checkVisibleCount();
//   //   }
//   // }, [showAll]);

//   //   useEffect(() => {
//   //   if (!showAll) {
//   //     setVisibleCount(initialVisibleCount);
//   //   }
//   // }, [showAll, initialVisibleCount]);

//   const checkVisibleCount = () => {
//     if (!containerRef.current || !moreButtonRef.current) return;

//     const containerWidth = containerRef.current.offsetWidth - 48;
//     const moreBtnWidth = moreButtonRef.current.offsetWidth;

//     let totalWidth = 0;
//     let count = 0;

//     const cardWidths = Array.from(containerRef.current.children)
//       .filter(
//         (child) => !child.dataset.ignore && !child.classList.contains("hidden")
//       )
//       .map((child) => child.offsetWidth + 8);

//     for (let width of cardWidths) {
//       totalWidth += width;
//       if (totalWidth + moreBtnWidth > containerWidth) break;
//       count++;
//     }

//     setVisibleCount(count);
//     setInitialVisibleCount(count);
//   };

//   useEffect(() => {
//     checkVisibleCount();
//     window.addEventListener("resize", checkVisibleCount);
//     return () => window.removeEventListener("resize", checkVisibleCount);
//   }, [dataList]);

//   useEffect(() => {
//     const handleResize = () => {
//       if (!showAll) {
//         checkVisibleCount();
//       }
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, [showAll]);

//   return (
//     // <div className="flex justify-start w-full"
//     // id="summary-card-placeholder"
//     // >
//     <div
//       className="flex gap-2.5 flex-wrap h-fit  relative transition-all duration-300 whitespace-nowrap bg-red-500"
//       ref={containerRef}
//       style={{
//         width: "100%",
//         overflow: "hidden",
//         // height:showAll?"80px":"auto",
//         // height:'',
//         // height:'80px',
//         // marginBottom:'1.5%'

//         paddingBottom: "0.5%",
//       }}
//     >
//       {/* {visibleCards?.map((item, idx) => (
//               <div
//                 key={item.value || idx}
//               className="flex items-center justify-evenly bg-white w-fit shadow-md p-1 px-2 border border-indigo-500 rounded-[10px] text-sm h-[30px]"
//               >
//                 {type === "checkbox" && (
//                   <div
//                     className={`cursor-pointer ${
//                       item.disableOnChange
//                         ? "opacity-50 pointer-events-none"
//                         : ""
//                     }`}
//                     onClick={() => {
//                       if (!item.disableOnChange) {
//                         onSummaryChange({
//                           target: { value: item.value, name: item.name },
//                         });
//                       }
//                     }}
//                   >
//                     {summaryCheckBoxValue === item.value ? (

//                       a
//                     ) : (

//                       a
//                     )}
//                   </div>
//                 )}
//                 <span
//                   className={` ${item.textClassName}`}
//                   onClick={item.onClick}
//                 >
//                   {item.label}:
//                 </span>
//                 <span
//                   className="text-base font-semibold text-[#2F2F2F]"
//                   style={{
//                     fontWeight: 600,
//                     fontSize: "16px",
//                     lineHeight: "44px",
//                     letterSpacing: "-0.02em",
//                     color: "rgba(47, 47, 47, 1)",
//                   }}
//                 >
//                   {item.showCurrency && "₹"}
//                   {item.percentage ? item.count ?? "0.0%" : item.count}
//                   {item.percentage && "%"}
//                 </span>
//               </div>
//         ))} */}

//       {/* + More / Show Less Button */}
//       {!showAll && remainingCount > 0 && (
//         <button
//           style={{
//             boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
//             whiteSpace: "nowrap",
//             flexShrink: 0,
//             backgroundColor: "white",
//             border: "solid",
//             borderWidth: "1px",
//             borderColor: "#a18bff",
//             borderRadius: "12px",
//             color: "#4319ff",
//             paddingLeft: "0.83%",
//             paddingRight: "0.83%",
//             fontSize: "14px",
//             fontWeight: "600",
//             // height:"5.5%"
//             height: "30px",
//           }}
//           onClick={() => setShowAll(true)}
//         >
//           +{remainingCount} More
//         </button>
//       )}
//       {showAll && (
//         <button
//           style={{
//             boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
//             whiteSpace: "nowrap",
//             flexShrink: 0,
//             backgroundColor: "white",
//             border: "solid",
//             borderWidth: "1px",
//             borderColor: "#a18bff",
//             borderRadius: "12px",
//             color: "#4319ff",
//             paddingLeft: "0.83%",
//             paddingRight: "0.83%",
//             fontSize: "14px",
//             fontWeight: "600",
//             height: "30px",
//           }}
//           onClick={() => setShowAll(false)}
//         >
//           Show Less
//         </button>
//       )}
//       {/* {!showAll && (
//         <button
//           ref={moreButtonRef}
//           data-ignore="true"
//           className="absolute invisible more-button w-[5.0625rem] h-[30px]"
//         >
//           +{dataList.length} More
//         </button>
//       )} */}
//     </div>
//     // </div>
//   );
// };

export const TableSummary = ({
  summaryData = [
    // { name: 'Total Records', value: 1250, checked: true },
  ],
  onSummaryChange,
  type = 'default',
  pageSize=20
}) => {

  const [isExpanded, setIsExpanded] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [summaryStats, setSummaryStats] = useState(summaryData);
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let obj = getSummaryUrl()?.obj || {}
    let data = summaryData
    if (type === 'be') {
      data = data?.map((item) => {
        if (obj[item?.key]) {
          let checekd = obj[item?.key]?.includes(item?.name)
          return { ...item, checked: checekd }
        }
        return item
      })
    }
    // console.log(getSummaryUrl()?.obj, 'bashar summaryStats')
    setSummaryStats(data)
  }, [summaryData])
  useEffect(() => {
    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [summaryStats]);

  const checkOverflow = () => {
    if (containerRef.current && contentRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const contentWidth = contentRef.current.scrollWidth;
      setHasOverflow(contentWidth > containerWidth);
    }
  };

  const handleCheckboxChange = (index) => {
    let cahngedData = {}

    const updatedStats = summaryStats?.map((stat, i) => {
      if (i === index) {
        cahngedData = { ...stat, checked: !stat.checked }
        return { ...stat, checked: !stat.checked }
      }

      return stat
    })
    let keys = { ...getSummaryUrl()?.obj } || {};
    updatedStats?.forEach((item) => {
      if (item?.checked) {
        if (keys[item?.key]) {
          keys[item?.key] = Array.from(new Set([...keys[item?.key], item?.name]));
        } else {
          keys[item?.key] = [item?.name];
        }
      }
    });

    setSummaryStats(updatedStats);
    if (onSummaryChange) {
      onSummaryChange(cahngedData);
    }
    if (type === 'be') {
      if (cahngedData?.checked === false) {
        if (keys[cahngedData?.key]) {
          keys[cahngedData?.key] = keys[cahngedData?.key]?.filter((item) => item !== cahngedData?.name)
        }
      }
      let url = setStatsUrl(location.search, keys, false,1,pageSize)
      navigate(url ? `?${url}` : '', { replace: true });
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const SummaryItem = ({ stat, index, showCheckbox = true }) => (
    <div style={{ borderRadius: "10px", borderColor: '#8775f1' }} className="flex items-center gap-2 whitespace-nowrap border h-[30px] px-2 w-fit shadow-md">
      {showCheckbox && (
        <input

          disabled={stat?.disabled ? stat?.disabled : false}
          type="checkbox"
          checked={stat.checked}
          onChange={() => handleCheckboxChange(index)}
          className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
        />
      )}
      <span className="text-sm font-medium text-gray-700">{stat?.label}:</span>
      <span className="text-sm font-semibold text-gray-900">{stat?.value||0}</span>
    </div>
  );

  return (
    <div className="w-full  bg-trasnparent">

      <div ref={containerRef} className="relative">
        {!isExpanded ? (
          // Single line view with overflow handling
          <div className="flex items-center gap-4">
            <div
              ref={contentRef}
              className="flex items-center gap-4 overflow-hidden flex-1"
              style={{
                maskImage: hasOverflow && !isExpanded
                  ? 'linear-gradient(to right, black 0%, black 85%, transparent 100%)'
                  : 'none',
                WebkitMaskImage: hasOverflow && !isExpanded
                  ? 'linear-gradient(to right, black 0%, black 85%, transparent 100%)'
                  : 'none'
              }}
            >
              {summaryStats.map((stat, index) => (
                <SummaryItem key={index} stat={stat} index={index} />
              ))}
            </div>

            {hasOverflow && (
              <button
                style={{ border: "solid", borderColor: '#8775f1', color: '#573bff', borderWidth: '1px', borderRadius: '10px' }}
                onClick={toggleExpanded}
                className="ml-2 px-2 py-1 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors duration-200 whitespace-nowrap"
              >
                More
              </button>
            )}
          </div>
        ) : (
          // Expanded view with all items
          <div className="space-y-3">
            {/* className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3" */}
            <div className="flex flex-wrap gap-2">
              {summaryStats.map((stat, index) => (
                <SummaryItem key={index} stat={stat} index={index} />
              ))}
              <button
                style={{ border: "solid", borderColor: '#8775f1', color: '#573bff', borderWidth: '1px', borderRadius: '10px' }}
                onClick={toggleExpanded}
                className=" px-2 py-1 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors duration-200"
              >
                See Less
              </button>
            </div>


          </div>
        )}
      </div>

      {/* Optional: Show selected count */}
      {/* <div className="mt-4 pt-3 border-t border-gray-100">
        <p className="text-xs text-gray-500">
          {summaryStats.filter(stat => stat.checked).length} of {summaryStats.length} items selected
        </p>
      </div> */}
    </div>
  );
};

export const CommonBeFilterDropdown = ({
  setSelectedKeys,
  selectedKeys,
  confirm,
  clearFilters,
  dataIndex,
  key,
  // dataSource = [],
  enableSearch = true,
  enableSorting = true,
  enableBlankOptions = true,
  enableOptionsList = true,
  onSort = () => { },
  placeholder = "",
  optionsSortType = "ascending",
  textFormatter,
  inputType,
  // setSortOrder = () => { },
  col,
  filtersFunction,
  on_filter_search_hit_api,
  filterOptionPageSize = 20,
  optionsFooter = false,
  sorting = false
}) => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  // const selectedValues = []
  const [selectedValues,setSelectedValues] = useState([])
  const [sortOrder, setSortOrder] = useState(null)
  const inputRef = useRef(null)
  const [page,setPage] = useState(1)
  const [total,setTotal] = useState(0)
  const optionRef = useRef();
  const [optionApiLoading,setOptionApiLoading] = useState(false)
  const [hasReachedEnd, setHasReachedEnd] = useState(false)
  const [maxPage,setMaxPage] = useState(Number.MAX_SAFE_INTEGER)
  const [searchQuery,setSearchQuery] = useState('')
  const debouncedSetSearchText = useMemo(
    () => debounce(setSearchText, 10),
    []
  );
  const debouncedSetSearchQuery = useMemo(
    () => debounce(setSearchQuery, 300),
    []
  );
  const [allOptions,setAllOptions] = useState([])
  // const allOptions = []
  // const filteredOptions = []

  const filteredOptions = useMemo(() => {
    // const searchTerms = searchText
    //   .split(",")
    //   .map((s) => s.trim().toLowerCase())
    //   .filter(Boolean);
    // if (searchTerms.length === 0) {
    //   return allOptions;
    // }
    // let exactMatches = allOptions.filter((val) => {
    //   let valueStr = val?.toString().toLowerCase();
    //   return searchTerms.some((term) => valueStr.includes(term));
    // });
    let exactMatches = allOptions?.filter((item)=> item !== null && item !== 'undefined' && item !== '')
    exactMatches = exactMatches?.map((item) => {
      if (textFormatter) {
        let i = textFormatterWithType(item, textFormatter, true);
        if(getDataType(i) === "string"){
          // i = i(item)
           i = i?.trim();
        }
        // i = i?.trim();
        // return i;
        return {label:i,value:item};
      } else {
        return {label:item,value:item};
      }
    });
    // console.log(exactMatches,textFormatterWithType(exactMatches[0],textFormatter))
    // setSelectedKeys(exactMatches);
    return exactMatches;
  }, [allOptions]);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    let existing = getFiltersUrl()
    if (existing?.obj[col?.key]) {
      setSearchText(existing?.obj[col?.key]?.join(', '))
      setSelectedValues(existing?.obj[col?.key])
    }
    
    // Initialize sort order from URL
    const currentQuery = qs.parse(location.search);
    if (currentQuery.sortKey === col?.key && currentQuery.sortOrder) {
      setSortOrder(currentQuery.sortOrder);
    }
  }, [])
  useEffect(()=>{
    let query = `/${col?.key}?page=${page}&limit=${filterOptionPageSize}`
    if(searchQuery !== ""){
       query += searchQuery
    }
    if(page <= maxPage && getDataType(filtersFunction) === "function" ){
      getOptions(query)
    }
    
  },[page,searchQuery])
  
  // Reset pagination when search text changes
  useEffect(() => {
    if(searchText !== "") {
      setPage(1)
      setMaxPage(Number.MAX_SAFE_INTEGER)
      setAllOptions([])
    }
  }, [searchQuery])
  useEffect(() => {
    const handleScroll = () => {
      // console.log('bashar_handleScroll',page,maxPage)
      const scrollableDiv = optionRef.current;
      if (
        scrollableDiv.scrollHeight - scrollableDiv.scrollTop <=
        scrollableDiv.clientHeight + 10
      ) {
        if(page < maxPage){
          setPage((prevPage) => prevPage + 1);

        }
      }
    };
    const scrollableDiv = optionRef.current;
    if (scrollableDiv) {
      scrollableDiv.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (scrollableDiv) {
        scrollableDiv.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);
  const getOptions = async(query)=>{
    // Don't make API call if we've reached the end
    if(page > maxPage) {
      return
    }
    setOptionApiLoading(true)
    try {
      let {options,total} = await filtersFunction(query)
      setTotal(total)
      setMaxPage(Math.ceil(total/filterOptionPageSize))
      // For first page, replace all options, for subsequent pages, append
      if(page === 1) {
        setAllOptions(options) // Reset when starting fresh
      } else {
        setAllOptions((prev)=>([
          ...prev,
          ...options
        ]))
      }
    } catch (error) {
      let message = formattedError(error)
      openNotification({
        message:`Unable to load ${placeholder?.replace('Search', '')} filter options.`,
        description:message,
        type:'error',
        duration:0,
        placement:'bottomRight'

                  })
    }
    setOptionApiLoading(false)
  }
  const handleCheckboxChange = (checkedValues) => {
    // console.log(checkedValues,'bashar checkedValues')
    let next = [...checkedValues]
    // let next = [...new Set([...checkedValues, ...selectedValues])];

    if (next.includes("null") && next.includes("not_null")) {
      // Keep only the last one between "Blank" and "Non Blank"
      const lastSelected = checkedValues.findLast(
        (val) => val === "null" || val === "not_null"
      );

      next = checkedValues.filter(
        (val) => val !== "null" && val !== "not_null"
      );

      next.push(lastSelected);
    }
    setSelectedValues(next)
    // setSelectedKeys(next);
  };
  const handleSearch = (e) => {
    let value = []
    if(on_filter_search_hit_api && fieldContainsValue(searchText)){
      value = [searchText]
    }
    if (selectedValues?.length > 0) {
      value = selectedValues
    }
    // console.log(value,'bashar value')
   
    let url = setFiltersUrl(location.search, { [col?.key]: value }, false,page,filterOptionPageSize)
    navigate(url ? `?${url}` : '', { replace: true });
    // setQueries({page:1,limit:filterOptionPageSize,})
  }
  const handleReset = () => {
    setSelectedValues([])
    // setSortOrder(null)
    setSearchText('');
    setSearchQuery('')
    let url = setFiltersUrl(location.search, { [col.key]: [] }, false);
    // removeUrlQuery()
    navigate(url ? `?${url}` : '', { replace: true });
   
  }
  const handleSort = (order) => {
    let newOrder = order
    if(sortOrder ===order){
      newOrder = null
    }
    setSortOrder(newOrder)
    const currentQuery = qs.parse(location.search);
    const updatedQuery = {
      ...currentQuery,
      sort: `${col?.key}:${newOrder}`,
    };
    if(newOrder === null){
      delete updatedQuery.sort
    }
    const queryString = qs.stringify(updatedQuery, { encode: false });
    navigate(`?${queryString}`, { replace: true });
  }
  const handleInputSearch = (e)=>{
    let value = e.target.value
    if(textFormatter?.includes('convertToISTFormatted')||textFormatter?.includes('convertToISTFormatted:time')){
      let v = reverseISTFormatted(value)
      // console.log(v,'bashar_v')
      value = v
    }
    debouncedSetSearchQuery(`&search=${value}`)
    debouncedSetSearchText(value)
  }
  return (
    <div style={{ padding: 8, width: 200, borderRadius: "16px" }}>
      {sorting&&<div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">{col?.title}</span>
        <div className="flex items-center gap-1 justify-center">
        <button
            onClick={() => handleSort('asc')}
            className=" h-[50%] p-1"
            style={{
              transform: 'rotate(180deg)',
              border:'solid',
              borderRadius:'5px',
              borderWidth:'1px',
              borderColor:'#8471f2',
              color:'#8471f2',
              ...(sortOrder === 'asc'&&{
                backgroundColor:'#8471f2',
              
                color:'white'
              })
            }}
            // rotate this icon 180 degree
            
          
            title="Sort Ascending"
          >
            <SvgIcon type='down-arrow' size="12"/>
          </button>
          <button
            onClick={() => handleSort('desc')}
            className=" h-[50%] p-1"
            style={{
              border:'solid',
              borderRadius:'5px',
              borderWidth:'1px',
              borderColor:'#8471f2',
              color:'#8471f2',
              ...(sortOrder === 'desc'&&{
                backgroundColor:'#8471f2',
              
                color:'white'
              })
            }}
            title="Sort Ascending"
          >
            <SvgIcon type='down-arrow' size="12"/>
          </button>
        </div>
      </div>}
      {enableSearch && (
        <Input
          ref={inputRef}
          type={inputType ? inputType : "text"}
          onWheel={(e) => {
            if (inputType === "number") {
              e.target.blur();
            }
          }}
          className="border-[#8471f2] transition-colors duration-200"
          onFocus={(e)=>{
            e.target.style.borderColor = '#8471f2'
          }}
          // onBlur={(e)=>{
          //   e.target.style.borderColor = '#d1d5db'
          // }}
          placeholder={placeholder}
          value={searchText}
          onChange={(e) => {
            handleInputSearch(e)
            // console.log(e.target.value, 'this_is_the_value')
            // setSearchText(e.target.value);
            // debouncedSetSearchText(e.target.value);
          }}
          style={{ marginBottom: 8, display: "block", height: "4%" }}
        />
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 8,
        }}
      >
        <HtmlButton 
        type="primary"
        text="Search"
        onClick={()=>{
          handleSearch()
        }}
        disabled={(selectedValues?.length === 0 && !on_filter_search_hit_api)}
        style={{padding:'0px 10px',width:"45%",backgroundColor:"#8471f2",borderRadius:'5px',color:'white',}}
        // className="hover:bg-blue-500 transition-colors duration-200"
        />
        <HtmlButton 
        type="primary"
        text="Reset"
        onClick={()=>{
          handleReset()
        }}
        style={{
          padding:'2px 10px',
          width:"45%",
          border:"solid",
          borderColor:"#8471f2",
          borderRadius:'5px',
          color:'#8471f2',
          backgroundColor:'transparent'}}
        // className="hover:bg-blue-500 transition-colors duration-200"
        />
      </div>

      {enableOptionsList && (
        <div
          ref={optionRef}
          style={{ maxHeight: 200, overflowY: "auto", marginBottom: 8 }}
          className="custom-scrollbar"
        >
          <Checkbox.Group
            style={{ display: "flex", flexDirection: "column" }}
            value={selectedValues}
            onChange={handleCheckboxChange}
          >
            {enableBlankOptions && (
              <>
                <Checkbox className="custom-checkbox"  value="null">Blank</Checkbox>
                <Checkbox className="custom-checkbox" value="not_null">Non Blank</Checkbox>
              </>
            )}
            {[
              ...new Set(
                filteredOptions?.map((item) => {
                  let v = item;
                  if (fieldContainsValue(v?.label) && textFormatter) {
                    v['label'] = textFormatterWithType(v?.label, textFormatter);
                  }
                  return v;
                })
              ),
            ].map((option,index) => {
              if (
                enableBlankOptions &&
                (option === "Blank" || option === undefined)
              )
                return null;
              return (
                <Checkbox className="custom-checkbox" key={index} value={option?.value}>
                  {option?.label}
                </Checkbox>
              );
            })}
          </Checkbox.Group>
          {optionApiLoading&&<p className="text-center flex justify-center items-center p-0">
            <SvgIcon 
            // type="spinner"
            type='three-dots-loader'
            size={40}
            color="gray"
            />
          </p>}
        </div>
      )}
     
      {optionsFooter && enableOptionsList&&<p className="text-[12px] text-gray-500 p-0">
        1-{Math.min(filteredOptions?.length,total)} of {total}
      </p>}
    </div>
  );
};
// const setFiltersUrl = (existingLocationSearch,obj,open=true)=>{
//   const jsonString = JSON.stringify(obj);
//   const filterUrl = encodeURIComponent(jsonString);
//   const currentQuery = qs.parse(existingLocationSearch);
//   let updatedQuery = {
//     ...currentQuery,
//   };
//   console.log(obj,'this_is_the_obj',updatedQuery.filters)
//   if(fieldContainsValue(obj)){
//     updatedQuery["filters"]=filterUrl
//   }
//   // console.log(updatedQuery,'this_is_the_updated_query')
//   const queryString = qs.stringify(updatedQuery, { encode: false });
//   if(open){
//     window.history.replaceState({}, '', queryString ? `?${queryString}` : '');
//     // window.history.pushState({}, '', queryString ? `?${queryString}` : '');
//   }
//   // }else{
//   //   window.history.replaceState({}, '', queryString ? `?${queryString}` : '');
//   // }

//   return queryString
// }
const setFiltersUrl = (existingLocationSearch, obj, open = true,page,pageSize) => {
  // 1. Parse existing filters from the URL
  const currentQuery = qs.parse(existingLocationSearch);
  let existingFilters = {};
  if (currentQuery.filters) {
    try {
      existingFilters = JSON.parse(decodeURIComponent(currentQuery.filters));
    } catch (e) {
      existingFilters = {};
    }
  }

  // 2. Merge new filters into existing filters
  Object.keys(obj).forEach((key) => {
    if (obj[key] && obj[key].length > 0) {
      existingFilters[key] = obj[key];
    } else {
      // 3. Remove key if value is empty (for reset)
      delete existingFilters[key];
    }
  });

  // 4. Encode and update the merged filters object in the URL
  const filterUrl = encodeURIComponent(JSON.stringify(existingFilters));
  let updatedQuery = {
    ...currentQuery,
    filters: filterUrl,
  };
  if(page){
    updatedQuery.page=page
  }
  if(pageSize){
    updatedQuery.pageSize=pageSize
  }

  // Remove filters param if no filters left
  if (Object.keys(existingFilters).length === 0) {
    delete updatedQuery.filters;
  }

  const queryString = qs.stringify(updatedQuery, { encode: false });
  if (open) {
    window.history.replaceState({}, '', queryString ? `?${queryString}` : '');
  }
  return queryString;
};
function toQueryString(filtersObj) {
  const params = new URLSearchParams();
  for (const key in filtersObj) {
    filtersObj[key].forEach(value => {
      params.append(key, value);
    });
  }
  return params.toString();
}
export const getFiltersUrl = () => {
  const params = new URLSearchParams(window.location.search);
  const encodedFilters = params.get('filters');

  if (encodedFilters) {
    try {
      const decoded = decodeURIComponent(encodedFilters);
      const filtersObj = JSON.parse(decoded);
      return { obj: filtersObj, queryString: toQueryString(filtersObj) }
      // Output:
      // { color: ['red', 'blue'], size: ['medium', 'large'], brand: ['nike'] }
    } catch (error) {
      console.error('Failed to parse filters:', error);
    }
  }
}
export const updateUrlQuery = (newParams = {}, set = true) => {
  const url = new URL(window.location.href); // Get current URL
  const searchParams = new URLSearchParams(url.search); // Current query params

  // Update or set each key in newParams
  Object.entries(newParams).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") {
      searchParams.delete(key); // Remove key if value is empty
    } else {
      searchParams.set(key, value); // Add or update key (retains encoded values)
    }
  });

  // Set the updated query string back to URL
  const newUrl = `${url.pathname}?${searchParams.toString()}`;

  if (set) {
    window.history.replaceState({}, "", newUrl);
  }
  return newUrl
}


const setStatsUrl = (existingLocationSearch, obj, open = true,page,pageSize) => {
  // 1. Parse existing filters from the URL
  const currentQuery = qs.parse(existingLocationSearch);
  let existingFilters = {};
  if (currentQuery.summary) {
    try {
      existingFilters = JSON.parse(decodeURIComponent(currentQuery.summary));
    } catch (e) {
      existingFilters = {};
    }
  }

  // 2. Merge new filters into existing filters
  Object.keys(obj).forEach((key) => {
    if (obj[key] && obj[key].length > 0) {
      existingFilters[key] = obj[key];
    } else {
      // 3. Remove key if value is empty (for reset)
      delete existingFilters[key];
    }
  });

  // 4. Encode and update the merged filters object in the URL
  const filterUrl = encodeURIComponent(JSON.stringify(existingFilters));
  let updatedQuery = {
    ...currentQuery,
    summary: filterUrl,
  };
  if(page){
    updatedQuery.page=page
  }
  if(pageSize){
    updatedQuery.pageSize=pageSize
  }
  // Remove filters param if no filters left
  if (Object.keys(existingFilters).length === 0) {
    delete updatedQuery.summary;
  }

  const queryString = qs.stringify(updatedQuery, { encode: false });
  if (open) {
    window.history.replaceState({}, '', queryString ? `?${queryString}` : '');
  }
  return queryString;
};

export const getSummaryUrl = () => {
  const params = new URLSearchParams(window.location.search);
  const encodedFilters = params.get('summary');

  if (encodedFilters) {
    try {
      const decoded = decodeURIComponent(encodedFilters);
      const filtersObj = JSON.parse(decoded);
      return { obj: filtersObj, queryString: toQueryString(filtersObj) }
      // Output:
      // { color: ['red', 'blue'], size: ['medium', 'large'], brand: ['nike'] }
    } catch (error) {
      console.error('Failed to parse summary:', error);
    }
  }
}
 