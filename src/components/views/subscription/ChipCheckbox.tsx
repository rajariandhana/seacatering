import React from "react";
import {useCheckbox, Chip, VisuallyHidden, tv} from "@nextui-org/react";

export const ChipCheckbox = (props: any) => {
  const checkbox = tv({
    slots: {
      base: "border-gray-300 hover:border-orange-300 bg-white hover:text-black",
      content: "text-gray-500 flex items-center gap-x-2 text-lg",
    },
    variants: {
      isSelected: {
        true: {
          base: "border-primary bg-primary hover:bg-orange-300 hover:border-orange-300",
          content: "text-black pl-1",
        },
      },
      isFocusVisible: {
        true: {
          base: "outline-none ring-2 ring-focus ring-offset-2 ring-offset-background",
        },
      },
    },
  });

  const {children, isSelected, isFocusVisible, getBaseProps, getLabelProps, getInputProps} =
    useCheckbox({
      ...props,
    });

  const styles = checkbox({isSelected, isFocusVisible});
  const { ref, ...safeLabelProps } = getLabelProps();

  return (
    <label {...getBaseProps()} className="">
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <Chip
        classNames={{
          base: styles.base(),
          content: styles.content(),
        }}
        color="primary"
        startContent={isSelected ? <CheckIcon className="ml-1" /> : null}
        variant="faded"
        {...safeLabelProps}
      >
        {children ? children : isSelected ? "Enabled" : "Disabled"}
      </Chip>
    </label>
  );
};

export const CheckIcon = (props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
};