import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Kbd } from "@/components/ui/kbd";
import { Bell, RefreshCcwIcon, SearchIcon } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <Empty>
        <EmptyHeader>
          <EmptyTitle>404</EmptyTitle>
          <EmptyDescription>
            A página que você está procurando,.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <EmptyDescription>
            Precisa de ajuda? <a href="#">Contate o suporte.</a>
          </EmptyDescription>
        </EmptyContent>
      </Empty>
    </div>
  );
}
