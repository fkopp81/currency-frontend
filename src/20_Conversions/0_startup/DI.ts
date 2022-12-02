import {
  DUseSubmitHandler,
  useSubmitHandler,
} from "20_Conversions/1_presentation/implementations/useSubmitHandler";
import { DConversions } from "20_Conversions/3_domain";
import Conversions from "20_Conversions/3_domain/implementations/Conversions";
import ConversionAPI from "20_Conversions/4_infrastructure/implementations/ConversionAPI";
import { DConversionAPI } from "20_Conversions/4_infrastructure/interfaces/IConversionAPI";
import { container } from "tsyringe";

container.register(DConversions, { useClass: Conversions });
container.register(DConversionAPI, { useClass: ConversionAPI });
container.register(DUseSubmitHandler, { useValue: useSubmitHandler });
