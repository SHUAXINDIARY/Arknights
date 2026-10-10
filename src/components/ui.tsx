import {
  cloneElement,
  createContext,
  isValidElement,
  useContext,
  useEffect,
  useId,
  useState,
  type ButtonHTMLAttributes,
  type ChangeEvent,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react";

type Color = "default" | "primary" | "secondary" | "success" | "warning" | "danger";
type Variant = "solid" | "flat" | "light" | "bordered";

const colorClasses: Record<Color, string> = {
  default: "bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600",
  primary: "bg-blue-600 text-white hover:bg-blue-500",
  secondary: "bg-violet-600 text-white hover:bg-violet-500",
  success: "bg-emerald-600 text-white hover:bg-emerald-500",
  warning: "bg-amber-500 text-white hover:bg-amber-400",
  danger: "bg-rose-600 text-white hover:bg-rose-500",
};

const flatClasses: Record<Color, string> = {
  default: "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700",
  primary: "bg-blue-500/15 text-blue-600 hover:bg-blue-500/25 dark:text-blue-300",
  secondary: "bg-violet-500/15 text-violet-600 hover:bg-violet-500/25 dark:text-violet-300",
  success: "bg-emerald-500/15 text-emerald-600 hover:bg-emerald-500/25 dark:text-emerald-300",
  warning: "bg-amber-500/15 text-amber-700 hover:bg-amber-500/25 dark:text-amber-300",
  danger: "bg-rose-500/15 text-rose-600 hover:bg-rose-500/25 dark:text-rose-300",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onPress?: () => void;
  color?: Color;
  variant?: Variant;
  size?: "sm" | "md" | "lg";
  isDisabled?: boolean;
  isLoading?: boolean;
}

export function Button({
  children,
  className = "",
  color = "primary",
  variant = "solid",
  size = "md",
  isDisabled,
  isLoading,
  onPress,
  onClick,
  type = "button",
  ...props
}: ButtonProps) {
  const sizeClass = size === "sm" ? "px-3 py-1.5 text-sm" : size === "lg" ? "px-5 py-3" : "px-4 py-2";
  const variantClass = variant === "bordered"
    ? `border border-current bg-transparent ${color === "default" ? "text-slate-600 dark:text-slate-200" : `text-${color}-500`}`
    : variant === "light"
      ? `bg-transparent ${color === "default" ? "text-slate-600 dark:text-slate-200" : `text-${color}-500`} hover:bg-slate-500/10`
      : variant === "flat"
        ? flatClasses[color]
        : colorClasses[color];

  return (
    <button
      {...props}
      type={type}
      disabled={isDisabled || isLoading}
      onClick={(event) => {
        onClick?.(event);
        onPress?.();
      }}
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 disabled:cursor-not-allowed disabled:opacity-50 ${sizeClass} ${variantClass} ${className}`}
    >
      {isLoading ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" /> : null}
      {children}
    </button>
  );
}

export function Card({ className = "", children, shadow, ...props }: HTMLAttributes<HTMLDivElement> & { shadow?: string }) {
  return <div {...props} className={`rounded-2xl bg-white ${shadow === "none" ? "shadow-none" : "shadow-md"} dark:bg-slate-900 ${className}`}>{children}</div>;
}

export function CardHeader({ className = "", children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={className}>{children}</div>;
}

export function CardBody({ className = "", children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={className}>{children}</div>;
}

export function CardFooter({ className = "", children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={className}>{children}</div>;
}

export interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  color?: Color;
  variant?: Variant;
  size?: "sm" | "md" | "lg";
  classNames?: { base?: string; content?: string };
}

export function Chip({ className = "", color = "default", variant = "solid", size = "md", classNames, children, ...props }: ChipProps) {
  const sizeClass = size === "sm" ? "px-2 py-0.5 text-xs" : size === "lg" ? "px-4 py-2" : "px-3 py-1";
  const colorClass = variant === "flat" ? flatClasses[color] : colorClasses[color];
  return <span {...props} className={`inline-flex items-center rounded-full font-medium ${sizeClass} ${colorClass} ${classNames?.base || ""} ${className}`}>{children}</span>;
}

export function Progress({ value = 0, label, showValueLabel = false, className = "", size, color = "primary", classNames, ...props }: HTMLAttributes<HTMLDivElement> & { value?: number; label?: string; showValueLabel?: boolean; size?: string; color?: Color; classNames?: { label?: string; value?: string } }) {
  const percentage = Math.max(0, Math.min(100, value));
  const barColor = color === "success" ? "bg-emerald-500" : color === "warning" ? "bg-amber-500" : color === "secondary" ? "bg-violet-500" : "bg-blue-500";
  const barHeight = size === "sm" ? "h-1.5" : "h-2";
  return (
    <div {...props} className={`w-full ${className}`}>
      {(label || showValueLabel) && <div className={`mb-1 flex justify-between text-xs text-slate-500 ${classNames?.label || ""}`}><span>{label}</span>{showValueLabel ? <span className={classNames?.value}>{Math.round(percentage)}%</span> : null}</div>}
      <div className={`${barHeight} overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700`}><div className={`h-full rounded-full ${barColor} transition-[width] duration-300`} style={{ width: `${percentage}%` }} /></div>
    </div>
  );
}

export function Divider({ className = "", ...props }: HTMLAttributes<HTMLHRElement>) {
  return <hr {...props} className={`border-0 border-t border-slate-200 dark:border-slate-700 ${className}`} />;
}

export function Spacer({ y = 1 }: { y?: number }) {
  return <div aria-hidden="true" style={{ height: `${y * 0.25}rem` }} />;
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  onValueChange?: (value: string) => void;
  onClear?: () => void;
  label?: string;
}

export function Input({ className = "", label, onValueChange, onClear, onChange, ...props }: InputProps) {
  const [value, setValue] = useState(String(props.defaultValue ?? props.value ?? ""));
  useEffect(() => {
    if (props.value !== undefined) setValue(String(props.value));
  }, [props.value]);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    onChange?.(event);
    onValueChange?.(event.target.value);
  };
  return (
    <label className={`block ${className}`}>
      {label ? <span className="mb-1 block text-sm text-slate-600 dark:text-slate-300">{label}</span> : null}
      <span className="relative block">
        <input {...props} value={value} onChange={handleChange} className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100" />
        {onClear && value ? <button type="button" aria-label="Clear" className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400" onClick={() => { setValue(""); onClear(); onValueChange?.(""); }}>×</button> : null}
      </span>
    </label>
  );
}

export interface SelectProps extends HTMLAttributes<HTMLSelectElement> {
  defaultSelectedKeys?: string[];
  label?: string;
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  startContent?: ReactNode;
  size?: string;
  variant?: string;
  classNames?: { trigger?: string };
}

export function Select({ className = "", label, startContent, defaultSelectedKeys, children, size, variant, classNames, ...props }: SelectProps) {
  const selectSize = size === "sm" ? "py-1 text-sm" : "py-2";
  const selectVariant = variant === "flat" ? "border-transparent" : "";
  return (
    <label className={`block ${className}`}>
      {label ? <span className="mb-1 block text-sm text-slate-600 dark:text-slate-300">{label}</span> : null}
      <span className={`flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 dark:border-slate-600 dark:bg-slate-800 ${selectVariant} ${classNames?.trigger || ""}`}>
        {startContent}
        <select {...props} defaultValue={defaultSelectedKeys?.[0]} className={`w-full bg-transparent text-slate-800 outline-none dark:text-slate-100 ${selectSize}`}>{children}</select>
      </span>
    </label>
  );
}

export function SelectItem({ children, value, startContent }: { children: ReactNode; value: string; startContent?: ReactNode }) {
  return <option value={value}>{startContent ? `${startContent} ` : ""}{children}</option>;
}

interface RadioGroupContextValue { value: string; onValueChange: (value: string) => void; }
const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export function RadioGroup({ value = "", onValueChange, className = "", children }: { value?: string; onValueChange: (value: string) => void; className?: string; children: ReactNode }) {
  return <div className={`flex flex-col ${className}`} role="radiogroup"><RadioGroupContext.Provider value={{ value, onValueChange }}>{children}</RadioGroupContext.Provider></div>;
}

export function Radio({ value, description, className = "", children }: { value: string; description?: string; className?: string; children: ReactNode }) {
  const context = useContext(RadioGroupContext);
  const id = useId();
  return <label htmlFor={id} className={`flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-3 transition hover:border-blue-300 dark:border-slate-700 ${className}`}><input id={id} type="radio" checked={context?.value === value} onChange={() => context?.onValueChange(value)} className="mt-1 accent-blue-600" /><span><span className="block text-slate-800 dark:text-slate-100">{children}</span>{description ? <span className="text-xs text-slate-500">{description}</span> : null}</span></label>;
}

export function Avatar({ src, className = "", alt = "avatar" }: { src?: string; className?: string; alt?: string }) {
  return <img src={src} alt={alt} className={`h-10 w-10 rounded-full object-cover ${className}`} />;
}

export function Image({ src, className = "", alt = "" }: { src?: string; className?: string; alt?: string }) {
  return <img src={src} alt={alt} className={`max-w-full object-cover ${className}`} />;
}

export function Link({ href, children, className = "", target, ...props }: HTMLAttributes<HTMLAnchorElement> & { href: string; target?: string }) {
  return <a {...props} href={href} target={target} rel={target === "_blank" ? "noreferrer" : undefined} className={className}>{children}</a>;
}

export function useDisclosure(initial = false) {
  const [isOpen, setIsOpen] = useState(initial);
  return { isOpen, onOpen: () => setIsOpen(true), onClose: () => setIsOpen(false), onOpenChange: (open: boolean) => setIsOpen(open) };
}

interface ModalContextValue { close: () => void; }
const ModalContext = createContext<ModalContextValue | null>(null);

export function Modal({ isOpen, onOpenChange, children }: { isOpen: boolean; onOpenChange?: (open: boolean) => void; size?: string; classNames?: Record<string, string>; children: ReactNode }) {
  if (!isOpen) return null;
  const close = () => onOpenChange?.(false);
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}><ModalContext.Provider value={{ close }}>{children}</ModalContext.Provider></div>;
}

export function ModalContent({ className = "", children }: { className?: string; children: ReactNode | ((onClose: () => void) => ReactNode) }) {
  const context = useContext(ModalContext);
  const content = typeof children === "function" ? children(context?.close ?? (() => undefined)) : children;
  return <div role="dialog" aria-modal="true" className={`max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-slate-900 ${className}`}>{content}</div>;
}

export function ModalHeader({ className = "", children }: HTMLAttributes<HTMLDivElement>) { return <div className={`border-b border-slate-200 px-5 py-4 dark:border-slate-700 ${className}`}>{children}</div>; }
export function ModalBody({ className = "", children }: HTMLAttributes<HTMLDivElement>) { return <div className={`px-5 py-4 ${className}`}>{children}</div>; }
export function ModalFooter({ className = "", children }: HTMLAttributes<HTMLDivElement>) { return <div className={`flex justify-end gap-2 border-t border-slate-200 px-5 py-4 dark:border-slate-700 ${className}`}>{children}</div>; }

interface DrawerContextValue { close: () => void; }
const DrawerContext = createContext<DrawerContextValue | null>(null);

export function Drawer({ isOpen, onOpenChange, children }: { isOpen: boolean; onOpenChange?: (open: boolean) => void; placement?: "left" | "right"; size?: string; classNames?: Record<string, string>; children: ReactNode }) {
  if (!isOpen) return null;
  const close = () => onOpenChange?.(false);
  return <div className="fixed inset-0 z-50 bg-slate-950/50" onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}><DrawerContext.Provider value={{ close }}>{children}</DrawerContext.Provider></div>;
}

export function DrawerContent({ children }: { children: ReactNode | ((onClose: () => void) => ReactNode) }) {
  const context = useContext(DrawerContext);
  const content = typeof children === "function" ? children(context?.close ?? (() => undefined)) : children;
  return <aside className="h-full w-full max-w-xs overflow-y-auto bg-white shadow-2xl dark:bg-slate-900">{content}</aside>;
}
export function DrawerHeader({ className = "", children }: HTMLAttributes<HTMLDivElement>) { return <div className={`px-5 py-4 ${className}`}>{children}</div>; }
export function DrawerBody({ className = "", children }: HTMLAttributes<HTMLDivElement>) { return <div className={`px-5 py-4 ${className}`}>{children}</div>; }
export function DrawerFooter({ className = "", children }: HTMLAttributes<HTMLDivElement>) { return <div className={`px-5 py-4 ${className}`}>{children}</div>; }

interface PopoverContextValue { open: boolean; toggle: () => void; }
const PopoverContext = createContext<PopoverContextValue | null>(null);

export function Popover({ isOpen = false, onOpenChange, children }: { isOpen?: boolean; onOpenChange?: (open: boolean) => void; placement?: string; children: ReactNode }) {
  const toggle = () => onOpenChange?.(!isOpen);
  return <PopoverContext.Provider value={{ open: isOpen, toggle }}><div className="relative inline-block">{children}</div></PopoverContext.Provider>;
}

export function PopoverTrigger({ children }: { children: ReactElement }) {
  const context = useContext(PopoverContext);
  if (!context || !isValidElement(children)) return children;
  const childProps = children.props as { onClick?: (event: React.MouseEvent) => void; onPress?: () => void };
  if (childProps.onPress) return children;
  const originalClick = childProps.onClick;
  return cloneElement(children as ReactElement<{ onClick?: (event: React.MouseEvent) => void }>, { onClick: (event: React.MouseEvent) => { originalClick?.(event); context.toggle(); } });
}

export function PopoverContent({ children }: { children: ReactNode }) {
  const context = useContext(PopoverContext);
  if (!context?.open) return null;
  return <div className="absolute bottom-full left-1/2 z-30 mb-2 w-64 -translate-x-1/2 rounded-xl border border-slate-200 bg-white p-2 shadow-xl dark:border-slate-700 dark:bg-slate-900">{children}</div>;
}

