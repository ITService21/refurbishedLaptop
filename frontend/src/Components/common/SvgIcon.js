import React from "react";

export const SvgIcon = ({ color = "currentColor", size = "15", type }) => {
  const renderIcon = () => {
    switch (type) {
      case "delete":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-4 h-4 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        );
      case "clock":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="6" x2="12" y2="12" />
            <line x1="12" y1="12" x2="16" y2="12" />
          </svg>
        );
      case "star":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill={color}
          >
            <polygon points="12 2 15 8 22 9 17 14 18 21 12 17 6 21 7 14 2 9 9 8 12 2" />
          </svg>
        );
      case "both-side-arrow":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 12h16M4 12l4-4M4 12l4 4M20 12l-4-4M20 12l-4 4" />
          </svg>
        );
      case "transfer":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2v20M2 12h20M12 2l-4 4M12 2l4 4M12 22l-4-4M12 22l4-4" />
          </svg>
        );
      case "success":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 11l3 3L22 4" />
          </svg>
        );
      case "error":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        );
      case "info":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2v8M12 14v2" />
            <circle cx="12" cy="18" r="1" />
          </svg>
        );
      case "warning":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10.29 3.86L1.86 20.29a1 1 0 0 0 .86 1.45h18.28a1 1 0 0 0 .86-1.45L13.71 3.86a1 1 0 0 0-1.42 0z" />
            <path d="M12 9v4M12 15h.01" />
          </svg>
        );
      case "spinner":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
          >
            <g stroke={color}>
              <circle
                cx="12"
                cy="12"
                r="9.5"
                fill="none"
                stroke-linecap="round"
                stroke-width="3"
              >
                <animate
                  attributeName="stroke-dasharray"
                  calcMode="spline"
                  dur="1.5s"
                  keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
                  keyTimes="0;0.475;0.95;1"
                  repeatCount="indefinite"
                  values="0 150;42 150;42 150;42 150"
                />
                <animate
                  attributeName="stroke-dashoffset"
                  calcMode="spline"
                  dur="1.5s"
                  keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
                  keyTimes="0;0.475;0.95;1"
                  repeatCount="indefinite"
                  values="0;-16;-59;-59"
                />
              </circle>
              <animateTransform
                attributeName="transform"
                dur="2s"
                repeatCount="indefinite"
                type="rotate"
                values="0 12 12;360 12 12"
              />
            </g>
          </svg>
        );
      case "upload":
        return (
          <svg
            width={size}
            height={size}
            stroke={color}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.3335 2V4.66667C9.3335 5.03486 9.63197 5.33333 10.0002 5.33333H12.6668"
              stroke={color}
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M9.3335 2V4.66667C9.3335 5.03486 9.63197 5.33333 10.0002 5.33333H12.6668"
              stroke="white"
              stroke-opacity="0.2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M11.3335 14H4.66683C3.93045 14 3.3335 13.403 3.3335 12.6667V3.33333C3.3335 2.59695 3.93045 2 4.66683 2H9.3335L12.6668 5.33333V12.6667C12.6668 13.403 12.0699 14 11.3335 14Z"
              stroke={color}
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M11.3335 14H4.66683C3.93045 14 3.3335 13.403 3.3335 12.6667V3.33333C3.3335 2.59695 3.93045 2 4.66683 2H9.3335L12.6668 5.33333V12.6667C12.6668 13.403 12.0699 14 11.3335 14Z"
              stroke="white"
              stroke-opacity="0.2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M8.00016 7.33203V11.332"
              stroke={color}
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M8.00016 7.33203V11.332"
              stroke="white"
              stroke-opacity="0.2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M6.00016 9.33203L8.00016 7.33203L10.0002 9.33203"
              stroke={color}
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M6.00016 9.33203L8.00016 7.33203L10.0002 9.33203"
              stroke="white"
              stroke-opacity="0.2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        );
      case "upload-done":
        return (
          <svg
            width={size}
            height={size}
            stroke={color}
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 3.83301V7.83301C14 8.38529 14.4477 8.83301 15 8.83301H19"
              stroke={color}
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M14 3.83301V7.83301C14 8.38529 14.4477 8.83301 15 8.83301H19"
              stroke="white"
              stroke-opacity="0.2"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M17 21.833H7C5.89543 21.833 5 20.9376 5 19.833V5.83301C5 4.72844 5.89543 3.83301 7 3.83301H14L19 8.83301V19.833C19 20.9376 18.1046 21.833 17 21.833Z"
              stroke={color}
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M17 21.833H7C5.89543 21.833 5 20.9376 5 19.833V5.83301C5 4.72844 5.89543 3.83301 7 3.83301H14L19 8.83301V19.833C19 20.9376 18.1046 21.833 17 21.833Z"
              stroke="white"
              stroke-opacity="0.2"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M9 15.833L11 17.833L15 13.833"
              stroke={color}
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M9 15.833L11 17.833L15 13.833"
              stroke="white"
              stroke-opacity="0.2"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        );
      case "right-arrow-point":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            stroke={color}
            height={size}
            viewBox="0 0 48 48"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="4"
              d="m19 12l12 12l-12 12"
            />
          </svg>
        );
      case "left-arrow-point":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            stroke={color}
            height={size}
            viewBox="0 0 48 48"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="4"
              d="M31 36L19 24l12-12"
            />
          </svg>
        );
      case "down-arrow-point":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            stroke={color}
            height={size}
            viewBox="0 0 48 48"
          >
            <path
              fill="none"
              stroke={color}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="4"
              d="M12 19l12 12 12-12"
            />
          </svg>
        );
      case "edit":
        return (
          <svg
            width={size}
            height={size}
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.24935 6.41699H5.49935C4.48683 6.41699 3.66602 7.2378 3.66602 8.25033V16.5003C3.66602 17.5128 4.48683 18.3337 5.49935 18.3337H13.7493C14.7619 18.3337 15.5827 17.5128 15.5827 16.5003V13.7503"
              stroke={color}
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M8.24935 6.41699H5.49935C4.48683 6.41699 3.66602 7.2378 3.66602 8.25033V16.5003C3.66602 17.5128 4.48683 18.3337 5.49935 18.3337H13.7493C14.7619 18.3337 15.5827 17.5128 15.5827 16.5003V13.7503"
              stroke="white"
              stroke-opacity="0.2"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M8.25 13.7499H11L18.7917 5.95822C19.5511 5.19882 19.5511 3.96761 18.7917 3.20822C18.0323 2.44882 16.8011 2.44882 16.0417 3.20822L8.25 10.9999V13.7499"
              stroke={color}
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M8.25 13.7499H11L18.7917 5.95822C19.5511 5.19882 19.5511 3.96761 18.7917 3.20822C18.0323 2.44882 16.8011 2.44882 16.0417 3.20822L8.25 10.9999V13.7499"
              stroke="white"
              stroke-opacity="0.2"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M14.666 4.58301L17.416 7.33301"
              stroke={color}
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M14.666 4.58301L17.416 7.33301"
              stroke="white"
              stroke-opacity="0.2"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        );
      case "download":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        );
      case "back-navigate":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        );

      case "minus": {
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
          >
            <path
              fill={color}
              d="M5 12a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1"
            />
          </svg>
        );
      }
      case "plus":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke={color}
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M18 12h-6m0 0H6m6 0V6m0 6v6"
            />
          </svg>
        );
      case "calendar":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-calendar"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
        );
      case "copy":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
          >
            <path
              fill={color}
              d="M21 8.94a1.3 1.3 0 0 0-.06-.27v-.09a1 1 0 0 0-.19-.28l-6-6a1 1 0 0 0-.28-.19a.3.3 0 0 0-.09 0a.9.9 0 0 0-.33-.11H10a3 3 0 0 0-3 3v1H6a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3v-1h1a3 3 0 0 0 3-3zm-6-3.53L17.59 8H16a1 1 0 0 1-1-1ZM15 19a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h1v7a3 3 0 0 0 3 3h5Zm4-4a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3v3a3 3 0 0 0 3 3h3Z"
            />
          </svg>
        );

      case "copied":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 512 512"
          >
            <path
              fill={color}
              fill-rule="evenodd"
              d="M307.503 42.667L426.666 161.83v307.504H85.333V42.667zm-17.69 42.667H128v341.333h256V179.52zm15.104 134.252l30.165 30.166l-100.416 100.416l-57.749-57.75l30.165-30.165l27.584 27.584z"
            />
          </svg>
        );
      case "location":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
          >
            <path
              fill={color}
              d="M12 11.5A2.5 2.5 0 0 1 9.5 9A2.5 2.5 0 0 1 12 6.5A2.5 2.5 0 0 1 14.5 9a2.5 2.5 0 0 1-2.5 2.5M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7"
            />
          </svg>
        );
      case "left-arrow":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="m4 12l-.354-.354l-.353.354l.353.354zm15 .5a.5.5 0 0 0 0-1zM9.646 5.646l-6 6l.708.708l6-6zm-6 6.708l6 6l.708-.708l-6-6zM4 12.5h15v-1H4z"
            />
          </svg>
        );
      case "dustbin":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
          >
            <path
              fill={color}
              d="M7.616 20q-.672 0-1.144-.472T6 18.385V6H5V5h4v-.77h6V5h4v1h-1v12.385q0 .69-.462 1.153T16.384 20zM17 6H7v12.385q0 .269.173.442t.443.173h8.769q.23 0 .423-.192t.192-.424zM9.808 17h1V8h-1zm3.384 0h1V8h-1zM7 6v13z"
            />
          </svg>
        );
      case "zoomin":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 256 256"
          >
            <g fill={color} fill-rule="evenodd">
              <path d="M120.46 158.29c-30.166 8.65-61.631-8.792-70.281-38.957s8.792-61.63 38.957-70.28s61.63 8.792 70.28 38.957c4.417 15.403-1.937 38.002-9.347 50.872c-.614 1.067 59.212 53.064 59.212 53.064l-17.427 17.63l-53.514-56.72s-10.233 3.241-17.88 5.434M104 144c22.091 0 40-17.909 40-40s-17.909-40-40-40s-40 17.909-40 40s17.909 40 40 40" />
              <path d="M111.912 80.047h-15.95v16.037H80v15.992h15.962V128h15.95v-15.924H128V96.084h-16.088z" />
            </g>
          </svg>
        );
      case "zoomout":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 256 256"
          >
            <g fill={color} fill-rule="evenodd">
              <path d="M120.46 158.29c-30.166 8.65-61.631-8.792-70.281-38.957s8.792-61.63 38.957-70.28s61.63 8.792 70.28 38.957c4.417 15.403-1.937 38.002-9.347 50.872c-.614 1.067 59.212 53.064 59.212 53.064l-17.427 17.63l-53.514-56.72s-10.233 3.241-17.88 5.434M104 144c22.091 0 40-17.909 40-40s-17.909-40-40-40s-40 17.909-40 40s17.909 40 40 40" />
              <path d="M80 96.084v15.992h48V96.084z" />
            </g>
          </svg>
        );
      case "close":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
          >
            <path
              fill={color}
              d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"
            />
          </svg>
        );
      case "filter-icon-on":
        return (
          <svg
            width={size}
            height={size}
            viewBox="0 0 16 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M1.50109 0H14.5011C14.7929 0.102358 15.021 0.334005 15.1188 0.627421C15.2166 0.920837 15.1732 1.243 15.0011 1.5L10.0011 7V14L6.00109 11V7L1.00109 1.5C0.829016 1.243 0.785548 0.920837 0.883353 0.627421C0.981158 0.334005 1.20923 0.102358 1.50109 0Z"
              fill="#4318FF"
            />
          </svg>
        );

      case "filter-icon-off":
        return (
          <svg
            width={size}
            height={size}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.50109 1H14.5011C14.7929 1.10236 15.021 1.33401 15.1188 1.62742C15.2166 1.92084 15.1732 2.243 15.0011 2.5L10.0011 8V15L6.00109 12V8L1.00109 2.5C0.829016 2.243 0.785548 1.92084 0.883353 1.62742C0.981158 1.33401 1.20923 1.10236 1.50109 1"
              stroke={color}
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return <div>{renderIcon()}</div>;
};

export function GetIcon({
  type,
  altText = "icon",
  className = "",
  style,
  width,
  height,
}) {
  const iconMap = {
    circle: "/icons/circle.svg",
    search: "/icons/search-icon.svg",
    companyLogo: "/icons/Logo-01 1.svg",
    companyLogoMobile: "/icons/Carrum_mv.svg",
    menu: "/icons/basil_menu-outline.svg",
    avatar: "/icons/avatar.svg",
    leftNavigation: "/icons/left_navigation.svg",
    rightNavigation: "/icons/rightarrow.svg",
    close_cross_icon: "/icons/close-cross-icon.svg",
    verticalThreeDots: "/icons/three-dots-vertical.svg",
    download: "/icons/download-svgrepo-com.svg",
    filterIcon: "/icons/filter-svgrepo-com.svg",
    darkFilterIcon: "/icons/dark-filter-svgrepo-com.svg",
    sortDown: "/icons/sort-down-svgrepo-com.svg",
    sortUp: "/icons/sort-up-svgrepo-com.svg",
    sortIcon: "/icons/sort-svgrepo-com.svg",
    upArrow: '/icons/up-arrow-svgrepo-com.svg",',
    downArrow: "/icons/bottom-arrow-svgrepo-com.svg",
  };
  const iconSrc = iconMap[type] || "/icons/default.svg";

  return (
    <img
      style={style}
      width={width}
      height={height}
      src={iconSrc}
      alt={altText}
      className={`custom-icon ${className}`}
    />
  );
}
