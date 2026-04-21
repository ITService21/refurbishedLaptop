import React, { useRef, useEffect, useState, useCallback, useMemo } from "react";
import { SvgIcon, GetIcon } from "./SvgIcon";
import Select, { components } from "react-select";
import { Collapse, Checkbox } from "antd";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { Modal, Switch } from "antd";
import "../styles/DropDown.css";
// Common Input Tag
export const Input = ({
  defaultValue,
  onkKeyUp,
  autocomplete,
  onmouseout,
  onFocus,
  pattern,
  onInput,
  maxLength,
  value,
  onChange,
  min = 0,
  max,
  type = "text",
  errormessage,
  className,
  placeholder,
  name,
  disabled,
  onBlur,
  style,
}) => {
  const inputRef = useRef(null);

  const handleKeyDown = (e) => {
    if (type === "number") {
      const invalidChars = ["e", "E", "+", "-"];
      if (invalidChars.includes(e.key)) {
        e.preventDefault();
      }
    }
  };

  useEffect(() => {
    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.addEventListener("wheel", handleWheel);
      return () => {
        inputElement.removeEventListener("wheel", handleWheel);
      };
    }
  }, []);

  const handleWheel = (e) => {
    if (type === "number" && document.activeElement === inputRef.current) {
      e.preventDefault();
    }
  };

  const inputStyle = {
    ...(type === "number" && {
      WebkitAppearance: "none",
      MozAppearance: "textfield",
      msAppearance: "none",
      appearance: "none",
      ...style,
    }),
  };

  const adjustedValue = type === "number" && value < 0 ? 0 : value;

  return (
    <div className={`${className}`}>
      <input
        defaultValue={defaultValue}
        ref={inputRef}
        autoComplete={autocomplete}
        onMouseOut={onmouseout}
        onFocus={onFocus}
        pattern={pattern}
        maxLength={maxLength}
        value={adjustedValue}
        onChange={onChange}
        type={type}
        min={min}
        max={max}
        name={name}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        onBlur={onBlur}
        onInput={onInput}
        onKeyUp={onkKeyUp}
        style={inputStyle} // Apply the style here
        // w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 p-2 text-[15px] !text-[#000000] ${
          disabled ? "hover:border-slate-200 pointer-events-none" : ""
        } focus:outline-none ${errormessage ? "border-red-500" : ""}`}
      />
      {errormessage && (
        <span className="text-red-500 text-sm mt-1">{errormessage}</span>
      )}
    </div>
  );
};

// Common Button Tag
export const Button = ({
  type = "click",
  onClick,
  text,
  className = "",
  disabled = false,
  loading = false,
  noPadding = false,
  svgIconType,
  iconPath,
  children,
  ...props
}) => {
  // Base styles
  let baseClass = "font-bold rounded inline-flex items-center gap-2";
  if (!noPadding) baseClass += " py-2 px-4";

  // Style based on type
  let typeClass = "";
  switch (type.toLowerCase()) {
    case "submit":
      typeClass = "bg-blue-600 hover:bg-blue-700 text-white";
      break;
    case "discard":
    case "reset":
      typeClass = "bg-gray-300 hover:bg-gray-400 text-black";
      break;
    case "click":
      typeClass = "bg-black hover:bg-[#424141] text-white";
      break;
    case "link":
      typeClass = "bg-transparent text-blue-600 hover:underline p-0";
      break;
    default:
      typeClass = "bg-neutral-500 hover:bg-neutral-600 text-white";
  }

  // Disabled and loading states
  if (disabled) typeClass += " cursor-not-allowed opacity-50";
  if (loading) typeClass += " pointer-events-none";

  return (
    <button
      {...props}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClass} ${typeClass} ${className}`}
    >
      {loading ? (
        "Please Wait..."
      ) : children ? (
        children
      ) : (
        <>
          {svgIconType && <SvgIcon type={svgIconType} />}
          {iconPath && <img src={iconPath} alt="icon" className="w-4 h-4" />}
          {text}
        </>
      )}
    </button>
  );
};

//Common Select Tag
export const ReactSelect = ({
  placeholder,
  options = [],
  notFoundMessage,
  onChange = () => {},
  value,
  disabled,
  isClearable = true,
  optionStyle = {},
}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  useEffect(() => {
    if (value) {
      setSelectedOption(
        options.find((option) => option.value === value) || null
      );
    } else {
      setSelectedOption(null);
    }
  }, [value, options]);
  // Handler for the select change event
  const handleChange = (selected) => {
    setSelectedOption(selected);
    onChange(selected);
  };
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: "#ccc",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#888",
      },
      borderRadius: "6px",
      paddingTop: "0px",
      height: "38px",
      color: "blue",
      display: "flex",
      alignItems: "center",
      backgroundColor: "",
      cursor: state.isDisabled ? "not-allowed" : "pointer",
      // cursor:'not-allowed'
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "5px",
      marginTop: "5px",
      zIndex: 1,
      //   backgroundColor:"pink"
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#f0f0f0" : "#fff",
      color: "#333",
      padding: "8px",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#e0e0e0",
      },
      //   backgroundColor:'green',
      fontSize: "15px",
      ...optionStyle,
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#333",
      fontSize: "15px",
      //   backgroundColor:'red',
      lineHeight: "1", // Adjust line height to reduce space
      margin: "0", // Remove any default margin
      //   paddingBottom:"10px"
      //   margin:"auto"
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#999", // Change the color of the placeholder if needed
      fontSize: "15px", // Change the font size of the placeholder
    }),
    input: (provided) => ({
      ...provided,
      color: "#333", // Change the color of the input text
      fontSize: "15px", // Change the font size of the input text
      lineHeight: "1", // Adjust line height to reduce space
      margin: "0", // Remove any default margin
    }),
    noOptionsMessage: (provided) => ({
      ...provided,
      color: "#999", // Change the color of the no options message
      padding: "8px", // Add some padding
      textAlign: "center", // Center the text
      fontSize: "15px",
    }),
    clearIndicator: (provided) => ({
      ...provided,
      // color: 'red', // Change the color of the clear indicator
      // cursor: 'pointer',
    }),
    menuPortal: (base) => ({
      ...base,
      zIndex: 1000, // Set your desired z-index here
    }),
  };

  //Common for Alert

  const CustomClearIndicator = (props) => {
    return (
      <components.ClearIndicator {...props}>
        <span
          style={{
            fontSize: "13px",
            cursor: "pointer",
            color: "#333", // Set default color
            ":hover": {
              color: "#666", // Set hover color
            },
          }}
        >
          ✖
        </span>
      </components.ClearIndicator>
    );
  };

  const noOptionsMessage = () => (
    <div style={{ color: "#999", textAlign: "center" }}>
      {notFoundMessage ? notFoundMessage : "No options"}
    </div>
  );
  return (
    <Select
      isDisabled={disabled}
      styles={customStyles}
      value={selectedOption}
      onChange={handleChange}
      options={[...options]}
      placeholder={`Select ${placeholder ? placeholder : ""}`}
      isClearable={isClearable}
      noOptionsMessage={noOptionsMessage}
      components={{ ClearIndicator: CustomClearIndicator }}
      menuPortalTarget={document.body}
    />
  );
};

//Common for Alert Mechanism
export const HtmlAlert = ({
  message,
  description,
  type = "info",
  onClose,
  showIcon = true,
}) => {
  const handleClose = () => {
    if (onClose) onClose();
  };

  const typeStyles = {
    error: {
      bg: "bg-red-100",
      text: "text-red-800",
      iconBg: "bg-red-500",
    },
    success: {
      bg: "bg-green-100",
      text: "text-green-800",
      iconBg: "bg-green-500",
    },
    info: {
      bg: "bg-blue-100",
      text: "text-blue-800",
      iconBg: "bg-blue-500",
    },
    processing: {
      bg: "bg-indigo-100",
      text: "text-indigo-800",
      iconBg: "bg-indigo-500",
    },
    warning: {
      bg: "bg-yellow-100",
      text: "text-yellow-800",
      iconBg: "bg-yellow-500",
    },
  };

  const styles = typeStyles[type] || typeStyles.info;

  return (
    <div
      className={`flex items-start p-3 rounded-md ${styles.bg} ${styles.text} relative`}
    >
      {showIcon && (
        <span
          className={`w-6 h-6 flex items-center justify-center rounded-full ${styles.iconBg} text-white mr-3 mt-1`}
        >
          <SvgIcon type={type} size="14px" />
        </span>
      )}

      <div className="flex-1">
        <strong className="block">{message}</strong>
        {description && <p className="text-sm mt-1">{description}</p>}
      </div>

      {onClose && (
        <button
          onClick={handleClose}
          className="absolute top-2 right-3 text-xl leading-none"
        >
          ×
        </button>
      )}
    </div>
  );
};

//Common Scroll Counter
export const ScrollCounter = ({
  targetNumber = 100,
  duration = 3000,
  className = "counter",
}) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef(null);

  // Function to update the counter value
  const updateCounter = () => {
    let current = 0;
    const increment = targetNumber / (duration / 10); // Calculate increment per frame

    const interval = setInterval(() => {
      if (current < targetNumber) {
        current += increment;
        setCount(Math.round(current)); // Round to avoid decimals
      } else {
        setCount(targetNumber);
        clearInterval(interval);
      }
    }, 10); // Speed of counting (in milliseconds)
  };

  const resetCounter = () => {
    setCount(0); // Reset the counter to zero
  };

  // Intersection observer to detect when the counter is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            updateCounter(); // Start counting when in view
          } else {
            resetCounter(); // Reset counter when out of view
          }
        });
      },
      { threshold: 0.5 }
    ); // Trigger when 50% of the element is visible

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, [targetNumber, duration]);

  return (
    <div ref={counterRef} className={className}>
      {count}+
    </div>
  );
};

// Common Click Selector Tag
export const ClickSelector = ({
  options = [],
  onSelect,
  text = "RAM",
  defaultText = "4 GB",
}) => {
  const [selected, setSelected] = useState(defaultText);

  const handleSelect = (option) => {
    setSelected(option);
    if (onSelect) onSelect(option);
  };

  return (
    <div className="flex gap-2 items-center mt-2">
      <div className="text-[18px] font-serif my-auto">{text}:</div>
      <div className="flex gap-2">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => handleSelect(option)}
            className={`px-3 py-[3px]  rounded-md border text-[13px] font-medium transition-colors duration-200 ${
              selected === option
                ? "bg-orange-600 text-white border-orange-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

//Filter Collapse Bar
const { Panel } = Collapse;
export const FilterCollapse = ({ items, defaultActiveKey = [] }) => {
  return (
    <Collapse
      defaultActiveKey={defaultActiveKey}
      expandIcon={({ isActive }) =>
        isActive ? <FaChevronDown /> : <FaChevronRight />
      }
    >
      {items?.map(({ key, header, options }) => (
        <Panel header={header} key={key}>
          <Checkbox.Group>
            <div
              className="gap-3 my-[10px] rounded-none"
              style={{ display: "flex", flexDirection: "column" }}
            >
              {options.map((option) => (
                <Checkbox key={option} value={option}>
                  {option}
                </Checkbox>
              ))}
            </div>
          </Checkbox.Group>
        </Panel>
      ))}
    </Collapse>
  );
};

// Whatsapp Icon Component
export const WhatsAppIcon = ({ phoneNumber = "" }) => {
  const openWhatsApp = () => {
    const url = `https://wa.me/${phoneNumber}`;
    window.open(url, "_blank");
  };

  return (
    <div className="fixed right-3 md:right-4 top-[95%] md:top-[92%] transform -translate-y-1/2 z-50 w-12 h-12 md:w-16 md:h-16 bg-green-500 rounded-full shadow-lg flex flex-col items-center justify-center cursor-pointer hover:bg-green-600">
      {" "}
      <div onClick={openWhatsApp}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
          className="w-8 h-8"
        />
      </div>
    </div>
  );
};

export function Loader() {
  return (
    <div className="flex justify-center items-center space-x-3 py-14 my-auto">
      <span
        className="loader-dot bg-pink-500 animate-loader"
        style={{ animationDelay: "0s" }}
      />
      <span
        className="loader-dot bg-yellow-500 animate-loader"
        style={{ animationDelay: "0.2s" }}
      />
      <span
        className="loader-dot bg-sky-500 animate-loader"
        style={{ animationDelay: "0.4s" }}
      />
    </div>
  );
}

export const DropDown = ({
  element,
  listItems = [],
  customStyles = {},
  className = "",
  icon = null,
  iconUrl = null,
  iconType = null,
  iconClassName,
}) => {
  const [open, setOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState("right");
  const dropdownRef = useRef(null);
  const containerRef = useRef(null);

  const onToggle = () => {
    setOpen(!open);
  };

  const adjustDropdownPosition = () => {
    if (containerRef.current && dropdownRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;

      if (containerRect.right + dropdownRect.width + 0 > viewportWidth) {
        setDropdownPosition("left");
        dropdownRef.current.style.right = `${containerRect.width + 0}px`;
      } else if (containerRect.left - dropdownRect.width - 0 < 0) {
        setDropdownPosition("right");
        dropdownRef.current.style.left = `${containerRect.width + 0}px`;
      } else {
        setDropdownPosition("right");
        dropdownRef.current.style.left = `${0}px`;
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", adjustDropdownPosition);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", adjustDropdownPosition);
    };
  }, []);

  useEffect(() => {
    if (open) {
      adjustDropdownPosition();
    }
  }, [open]);

  return (
    <div
      className={`arrow-dropdown-container`}
      ref={containerRef}
      style={{ ...customStyles }}
    >
      <div className={`input-box ${className} `} onClick={onToggle}>
        {iconUrl ? (
          <img src={iconUrl} alt="icon" className="icon-svg" />
        ) : icon ? (
          <span className="icon-text">{icon}</span>
        ) : iconType ? (
          <GetIcon type={iconType} className={iconClassName} />
        ) : (
          <span className="arrow">&#9662;</span>
        )}
      </div>

      {open && (
        <div
          style={{ whiteSpace: "nowrap" }}
          className={`dropdown-list w-[auto] ${
            dropdownPosition === "left" ? "dropdown-left" : "dropdown-right"
          }`}
          ref={dropdownRef}
        >
          {/* {listItems.map((item, index) => (
            <div key={index} className="dropdown-item">
              {item}
            </div>
          ))} */}
          {element}
        </div>
      )}
    </div>
  );
};

export function ModalBar({
  open,
  close,
  element,
  title,
  width,
  style,
  className,
  loading,
  mask = false,
  maxHeight = "80vh",
  maskClosable = false,
}) {
  const getWidth = () => {
    const width = window.innerWidth;
    if (width >= 1024) {
      return "50%"; // lg
    } else if (width >= 768) {
      return "70%"; // md
    } else if (width >= 640) {
      return "95%"; // sm
    } else {
      return "100%"; // default
    }
  };
  return (
    <Modal
      title={title}
      open={open}
      onCancel={close}
      footer={null}
      centered
      style={{ minWidth: "300px", ...style }}
      bodyStyle={{ maxHeight: maxHeight, overflowY: "auto" }}
      width={width || getWidth()}
      className={className}
      loading={loading}
      // zIndex={}
      // wrapClassName='bg-red-500'
      maskClosable={maskClosable}
      mask={mask}
      keyboard={true}
      destroyOnClose={true}
    >
      {element}
    </Modal>
  );
}

export const ToggleSwitch = ({
  defaultChecked,
  onChange,
  disabled,
  checked,
  checkedChildren,
  unCheckedChildren,
  isEmiCompleted,
}) => {
  const noLabel = !checkedChildren && !unCheckedChildren;

  return (
    <Switch
      defaultChecked={defaultChecked}
      disabled={disabled}
      checked={checked}
      onChange={onChange}
      checkedChildren={checkedChildren}
      unCheckedChildren={unCheckedChildren}
      className={noLabel ? "custom-switch-no-label mt-[1.5px]" : "mt-[1.5px]"}
      style={{
        background:
          checked && isEmiCompleted
            ? "green"
            : checked
            ? "linear-gradient(180deg, #868CFF 0%, #4318FF 100%)"
            : disabled && checked
            ? "linear-gradient(180deg, #868CFF 0%, #4318FF 100%)"
            : defaultChecked
            ? "linear-gradient(180deg, #868CFF 0%, #4318FF 100%)"
            : "",
        color: checked ? "white" : undefined,
      }}
    />
  );
};

export const ActionPopup = React.memo((props) => {
  const {
    open,
    mask = true,
    width = "auto",
    title,
    fields = [],
    saveText = "Save",
    discardText = "Discard",
    onClose,
    onSave,
    discardSaveLoading = false,
    onDiscardFieldsChange,
    messageOnly,
  } = props;

  const [internalOpen, setInternalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ message: "", type: "" });
  const clearAlert = () => {
    setAlert({
      message: "",
      type: "",
    });
  };
  console.log("re rendering", props.open);
  // Sync external `open` state with internal state
  useEffect(() => {
    setInternalOpen(props.open);
  }, [props]);

  // Reset data when modal closes
  const resetData = () => {
    setFormData({});
  };

  const handleClose = () => {
    setInternalOpen(false);
    resetData();
    clearAlert();
    onClose();
  };

  const handleChange = useCallback(
    (name, value) => {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
      if (onDiscardFieldsChange) {
        onDiscardFieldsChange(name, value);
      }
    },
    [onDiscardFieldsChange]
  );

  const save = async () => {
    setLoading(true);
    try {
      const res = await onSave?.(formData, props?.record, props);
      if (res?.statusCode === 200) {
        setAlert({
          type: "success",
          message: "Successfully completed. ",
        });
        setTimeout(() => {
          handleClose();
        }, 200);
      } else {
        setAlert({
          type: "error",
          message: "Unable to process request.",
        });
      }
    } catch (error) {
      let message = error?.message || "An error occurred while saving.";
      setAlert({
        type: "error",
        message: message,
      });
    }
    setLoading(false);
  };
  const renderedFields = () => {
    return fields.map((field, index) => {
      switch (field?.type) {
        case "HtmlTextArea":
          return (
            <HtmlTextArea
              key={index}
              value={formData[field.name]}
              allTimeEditMode={true}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              {...field}
            />
          );
        case "ToggleSwitch":
          return (
            <div key={index} className="flex items-center gap-2 mb-4">
              {field.label && <span>{field.label}</span>}
              <ToggleSwitch
                checked={!!formData[field.name]}
                onChange={(e) => handleChange(field.name, e)}
                {...field}
              />
            </div>
          );
        case "p":
          return (
            <p key={index} {...field}>
              {field.text}
            </p>
          );
        default:
          return null;
      }
    });
  };

  return (
    <ModalBar
      open={internalOpen}
      title={title}
      close={handleClose}
      mask={mask}
      width={width}
      element={
        <div>
          {alert?.message !== "" && (
            <HtmlAlert
              message={alert?.message}
              type={alert?.type}
              showIcon={true}
              onClose={clearAlert}
            />
          )}
          {messageOnly && <div className="font-semibold">{messageOnly}</div>}
          <div>{renderedFields()}</div>
          <div className="flex justify-end items-center gap-4 mt-4">
            <Button
              onClick={handleClose}
              type="discard"
              text={discardText}
              loading={false}
            />
            <Button
              onClick={() => {
                // save()
                save();
              }}
              type="save"
              text={saveText}
              loading={loading}
            />
          </div>
        </div>
      }
    />
  );
});

export const HtmlTextArea = ({
  disabled,
  allTimeEditMode,
  oneTimeEditMode,
  rows = 6,
  mandatory = false,
  required = false,
  placeholder,
  value,
  updatedValue,
  onChange = () => {},
  title,
  name,
  className,
}) => {
  const [access, setAccess] = useState(false);
  useEffect(() => {
    if (oneTimeEditMode) {
      setAccess(!fieldContainsValue(updatedValue));
    }
    if (allTimeEditMode) {
      setAccess(allTimeEditMode);
    }
    if (disabled) {
      setAccess(!disabled);
    }
  }, [oneTimeEditMode, disabled, value, updatedValue, allTimeEditMode]);
  return (
    <div>
      {title && (
        <h3 className="text-[13px] font-publicSans text-[#4B465C] mb-1 flex">
          {title} {mandatory && <SvgIcon size={10} type="star" />}
        </h3>
      )}
      <textarea
        name={name}
        rows={rows}
        // cols='5'
        className={`${
          required ? "border-red-500" : ""
        } form-input p-1 w-full text-sm font-light text-gray-600 bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-0 ${className}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={!access}
      ></textarea>
      {required && <p className="text-[13px] text-red-500">Required</p>}
    </div>
  );
};

export const openNotification = ({
  type = "info",
  message = "",
  description = "",
  placement = "top",
  duration = 3,
  pauseOnHover,
  showProgress,
}) => {
  notification[type]({
    message,
    description,
    placement,
    duration,
    pauseOnHover,
    showProgress,
  });
};

export const HtmlButton = ({
  className,
  style,
  loading = false,
  loadingPosition = "right",
  svgType,
  svgSize,
  svgColor,
  svgPosition = "left",
  text,
  iconPosition = "left",
  iconType,
  icon = false,
  type,
  disabled = false,
  iconSize = "20px",
  outline = false,
  onClick = () => {},
  confirmation = false,
  confirmationText = "Are You Sure",
  confirmationType = "confirmation",
}) => {
  const [confirmationState, setConfirmationState] = useState(0);
  const [confirmationValue, setConfirmationValue] = useState(text);
  const [buttonClass, setButtonClass] = useState(["htm-button"]);
  useEffect(() => {
    if (disabled) {
      setButtonClass([
        "cursor-not-allowed",
        "html-disabled-button",
        "html-button",
        `html-${type}-button-disabled`,
      ]);
    } else if (type && outline && !disabled && confirmationState === 0) {
      setButtonClass([
        `html-${type}-button-outline`,
        "html-button",
        "cursor-pointer",
      ]);
    } else if (type && !outline && !disabled && confirmationState === 0) {
      setButtonClass([`html-${type}-button`, "html-button", "cursor-pointer"]);
    } else if (type && !outline && !disabled && confirmationState > 0) {
      setButtonClass([
        `html-${confirmationType}-button`,
        "html-button",
        "cursor-pointer",
      ]);
    } else if (type && outline && !disabled && confirmationState > 0) {
      setButtonClass([
        `html-${confirmationType}-button-outline`,
        "html-button",
        "cursor-pointer",
      ]);
    }
  }, [disabled, type, outline, confirmationState, confirmationType]);
  return (
    <button
      style={{
        paddingLeft: icon && iconPosition === "left" ? "8px" : "",
        paddingRight: icon && iconPosition === "right" ? "8px" : "",
        ...style,
      }}
      onClick={() => {
        if (confirmation) {
          setConfirmationState(confirmationState + 1);
          setConfirmationValue(confirmationText);
          if (confirmationState > 0) {
            onClick();
            setConfirmationValue(text);
            setConfirmationState(0);
          }
        } else {
          onClick();
        }
      }}
      className={`${buttonClass?.join(" ")} ${className}`}
      disabled={disabled}
    >
      {loading && loadingPosition === "left" && <SvgIcon type="spinner" />}
      {svgType && svgPosition === "left" && (
        <SvgIcon color={svgColor} size={svgSize} type={svgType} />
      )}
      {icon && iconType && iconPosition === "left" && (
        <GetIcon
          className="bg-red-"
          width={iconSize}
          height={iconSize}
          type={iconType}
        />
      )}
      {loading ? "Please wait" : confirmation ? confirmationValue : text}
      {icon && iconType && iconPosition === "right" && (
        <GetIcon width={iconSize} height={iconSize} type={iconType} />
      )}
      {svgPosition === "right" && (
        <SvgIcon color={svgColor} size={svgSize} type={svgType} />
      )}
      {loading && loadingPosition === "right" && <SvgIcon type="spinner" />}
    </button>
  );
};

export const DocumentPreview = ({
  url,
  close,
  open,
  documentName,
  download = true,
  element,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // 🔹 Normalize and reverse incoming urls
  const urls = useMemo(() => {
    if (!url) return [];
    if (Array.isArray(url)) return [...url].reverse();
    if (typeof url === "string") {
      try {
        const parsed = JSON.parse(url);
        if (Array.isArray(parsed)) return [...parsed].reverse();
      } catch {
        return [url];
      }
    }
    return [];
  }, [url]);

  // Reset index when new urls arrive
  useEffect(() => {
    setCurrentIndex(0);
  }, [urls]);

  const isPdfUrl = useCallback(
    (fileUrl) => fileUrl?.toLowerCase()?.endsWith(".pdf"),
    []
  );

  // 🔹 Navigation Handlers
  const handleLeftClick = () =>
    setCurrentIndex((prev) => (prev - 1 + urls.length) % urls.length);

  const handleRightClick = () =>
    setCurrentIndex((prev) => (prev + 1) % urls.length);

  // 🔹 Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!open) return;
      if (e.key === "ArrowLeft") handleLeftClick();
      if (e.key === "ArrowRight") handleRightClick();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, urls]);

  // 🔹 Download Function
  const handleDownload = async () => {
    try {
      const response = await fetch(urls[currentIndex]);
      if (!response.ok) throw new Error("Network response was not ok");

      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = documentName || "document";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <Modal
      open={open}
      centered
      maskStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      bodyStyle={{ padding: 0 }}
      footer={null}
      closable
      onCancel={close}
    >
      <div className="flex justify-center items-center">
        <div className="bg-white rounded-md p-4 w-auto">
          {urls.length > 0 && (
            <div
              className="relative flex flex-col items-center justify-center bg-gray-200 rounded-md"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* 🔹 Image or PDF Preview */}
              {!isPdfUrl(urls[currentIndex]) ? (
                <img
                  src={urls[currentIndex]}
                  alt="Preview"
                  className="w-full h-auto object-contain rounded-md max-h-[400px]"
                />
              ) : (
                <iframe
                  key={urls[currentIndex]}
                  src={urls[currentIndex]}
                  title="PDF Viewer"
                  width="350"
                  height="400"
                  className="rounded-md border-none"
                />
              )}

              {/* 🔹 Left Arrow */}
              {urls.length > 1 && isHovered && (
                <button
                  className="absolute left-0 h-full flex items-center justify-center px-2 bg-transparent hover:bg-black/10"
                  onClick={handleLeftClick}
                >
                  <div className="bg-orange-500 p-1 md:p-2 rounded-md">
                    <LeftOutlined className="text-white" />
                  </div>
                </button>
              )}

              {/* 🔹 Right Arrow */}
              {urls.length > 1 && isHovered && (
                <button
                  className="absolute right-0 h-full flex items-center justify-center px-2 bg-transparent hover:bg-black/10"
                  onClick={handleRightClick}
                >
                  <div className="bg-orange-500 p-1 md:p-2 rounded-md">
                    <RightOutlined className="text-white" />
                  </div>
                </button>
              )}
            </div>
          )}

          {/* 🔹 Footer with info */}
          {urls.length > 0 && (
            <h3 className="my-2 font-bold text-center">
              {currentIndex + 1}/{urls.length}{" "}
              {isPdfUrl(urls[currentIndex]) ? "PDF" : "Image"}
            </h3>
          )}

          {/* 🔹 Action Buttons */}
          <div className="flex justify-center gap-3 mt-2">
            {urls.length > 0 && download && (
              <button
                onClick={handleDownload}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
              >
                Download
              </button>
            )}
            {element}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export const ExpandableTextModal = ({
  text = "",
  length = 24,
  title = "Reason",
  openLength = 1,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Parse if it's a JSON string that looks like an array
  let parsedText = text;
  try {
    if (
      typeof text === "string" &&
      text.trim().startsWith("[") &&
      text.trim().endsWith("]")
    ) {
      parsedText = JSON.parse(text);
    }
  } catch (err) {
    // If parsing fails, keep original text
  }

  const isArray = Array.isArray(parsedText);
  const arr = isArray ? parsedText : [];

  // Handle display preview
  const previewText = isArray
    ? arr.slice(0, 2).join(", ") + (arr.length > openLength ? "..." : "")
    : text.length > length
    ? text.slice(0, length) + "..."
    : text;

  const isLong = isArray ? arr.length > openLength : text.length > length;

  if (!text && arr.length === 0) return null;

  return (
    <>
      <span
        onClick={() => isLong && setIsModalOpen(true)}
        style={{
          cursor: isLong ? "pointer" : "default",
          display: "inline-block",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          maxWidth: "100%",
        }}
        title={isLong ? (isArray ? arr.join(", ") : text) : ""}
      >
        {previewText}
      </span>

      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        title={title}
      >
        {console.log("result1W1", isArray, arr, arr?.length > 0)}
        {isArray ? (
          arr?.length > 0 ? (
            <ol style={{ paddingLeft: "20px" }}>
              {arr?.map((item, index) => (
                <li
                  key={index}
                  style={{ marginBottom: "5px", whiteSpace: "pre-wrap" }}
                >
                  {item}
                </li>
              ))}
            </ol>
          ) : (
            "---"
          )
        ) : (
          <div style={{ whiteSpace: "pre-wrap" }}>{text ? text : "---"}</div>
        )}
      </Modal>
    </>
  );
};

export const StatusBadge = ({
  stageName,
  status,
  children,
  width,
  className,
  specialCase = false,
}) => {
  // --- Status Color Mapping ---
  const statusColorMapping = {
    default: "gray",
    pending: "orange",
    completed: "green",
    successful: "green",
    verified: "green",
    generated: "green",
    done: "green",
    received: "green",
    failed: "red",
    rejected: "red",
    blocked: "red",
  };

  // --- Utility: Normalize key for lookup ---
  const normalizeKey = (key) => key?.toLowerCase().replace(/\s+/g, "_");

  // --- Get color for status ---
  const getColorForStatus = (status) => {
    if (!status) return statusColorMapping.default;
    return (
      statusColorMapping[normalizeKey(status)] || statusColorMapping.default
    );
  };

  // --- Format status (regular + special case handling) ---
  const formatStatus = (status) => {
    if (!status) return "";

    const words = status.replace(/_/g, " ").split(" ");
    const shortForms = ["HM", "RTA", "RTD", "VA"];
    const lowercaseWords = [
      "to",
      "be",
      "on",
      "in",
      "at",
      "for",
      "of",
      "and",
      "or",
      "but",
    ];

    return words
      .map((word, index) => {
        const upperWord = word.toUpperCase();

        if (shortForms.includes(upperWord)) return upperWord;

        if (
          specialCase &&
          lowercaseWords.includes(word.toLowerCase()) &&
          index !== 0
        ) {
          return word.toLowerCase();
        }

        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(" ");
  };

  const color = getColorForStatus(status);
  const formattedStatus = formatStatus(status);

  return (
    <div
      className={`status-tag font-dm-sans-nocolor-500 ${color} ${
        className || ""
      } ${width ? `max-w-[${width}]` : ""}`}
    >
      {children || `${stageName ? stageName + " " : ""}${formattedStatus}`}
    </div>
  );
};

export function ContentModal({
  open,
  close,
  element,
  title,
  width,
  style,
  className,
  loading,
  mask = false,
  maxHeight = "80vh",
  maskClosable = false,
  isAlertContains = false,
  alertObj = {},
}) {
  const getWidth = () => {
    const width = window.innerWidth;
    if (width >= 1024) {
      return "50%"; // lg
    } else if (width >= 768) {
      return "70%"; // md
    } else if (width >= 640) {
      return "95%"; // sm
    } else {
      return "100%"; // default
    }
  };
  return (
    <Modal
      title={
        <div className="">
          <div className="">{title}</div>
          {isAlertContains && alertObj?.message && (
            <div className="w-full z-100">
              <HtmlAlert
                type={alertObj?.type}
                message={alertObj?.message}
                showIcon={alertObj?.showIcon ?? true}
              />
            </div>
          )}
        </div>
      }
      open={open}
      onCancel={close}
      footer={null}
      centered
      style={{ minWidth: "300px", ...style }}
      bodyStyle={{ maxHeight: maxHeight, overflowY: "auto" }}
      width={width || getWidth()}
      className={`custom-modal ${className || ""}`}
      loading={loading}
      // zIndex={}
      // wrapClassName='bg-red-500'
      maskClosable={maskClosable}
      mask={mask}
      keyboard={true}
      destroyOnClose={true}
    >
      {element}
    </Modal>
  );
}
