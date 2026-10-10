import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";

interface SelectAutocompleteProps<T> {
  items: T[];
  value?: string;
  label?: string;
  placeholder?: string;
  itemHeight?: number;
  getKey: (item: T) => string;
  getText: (item: T) => string;
  renderItem: (item: T) => ReactNode;
  onChange?: (value: string) => void;
  emptyText?: string;
}

export default function SelectAutocomplete<T>({
  items,
  value,
  label,
  placeholder,
  itemHeight = 52,
  getKey,
  getText,
  renderItem,
  onChange,
  emptyText = "Nothing found",
}: SelectAutocompleteProps<T>) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedKey, setSelectedKey] = useState(value ?? "");

  useEffect(() => {
    if (value !== undefined) setSelectedKey(value);
  }, [value]);

  useEffect(() => {
    const handleDocumentPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    document.addEventListener("pointerdown", handleDocumentPointerDown);
    return () => document.removeEventListener("pointerdown", handleDocumentPointerDown);
  }, []);

  const selectedItem = items.find((item) => getKey(item) === selectedKey);
  const selectedText = selectedItem ? getText(selectedItem) : "";
  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    if (!normalizedQuery) return items;
    return items.filter((item) => getText(item).toLocaleLowerCase().includes(normalizedQuery));
  }, [items, query, getText]);

  const choose = (item: T) => {
    const nextKey = getKey(item);
    setSelectedKey(nextKey);
    setQuery("");
    setIsOpen(false);
    onChange?.(nextKey);
  };

  return (
    <div ref={rootRef} className="relative w-52">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-left shadow-sm transition hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900"
        onClick={() => setIsOpen((open) => !open)}
      >
        {label ? <span className="block text-xs text-slate-500">{label}</span> : null}
        <span className="flex items-center justify-between gap-2 text-sm text-slate-800 dark:text-slate-100">
          <span className={selectedText ? "" : "text-slate-400"}>{selectedText || placeholder}</span>
          <span aria-hidden="true" className={`text-slate-500 transition-transform ${isOpen ? "rotate-180" : ""}`}>⌄</span>
        </span>
      </button>

      {isOpen ? (
        <div className="absolute left-0 right-0 top-full z-40 mt-1 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900">
          <input
            autoFocus
            value={query}
            inputMode="search"
            placeholder={placeholder}
            aria-label={label || placeholder}
            className="w-full border-b border-slate-200 bg-transparent px-3 py-2 text-sm outline-none dark:border-slate-700 dark:text-slate-100"
            onChange={(event) => setQuery(event.target.value)}
          />
          <div role="listbox" className="max-h-72 overflow-y-auto p-1">
            {filteredItems.length > 0 ? filteredItems.map((item) => (
              <button
                type="button"
                role="option"
                aria-selected={getKey(item) === selectedKey}
                key={getKey(item)}
                className="block w-full rounded-lg px-2 py-1 text-left transition hover:bg-blue-50 dark:hover:bg-slate-800"
                style={{ minHeight: itemHeight }}
                onClick={() => choose(item)}
              >
                {renderItem(item)}
              </button>
            )) : <div className="px-3 py-4 text-center text-sm text-slate-500">{emptyText}</div>}
          </div>
        </div>
      ) : null}
    </div>
  );
}

