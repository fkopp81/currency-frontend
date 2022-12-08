import { container } from "tsyringe";
import { DSelectCurrency, SelectCurrency } from "25_Currency/1_presentation";

container.register(DSelectCurrency, { useValue: SelectCurrency });
