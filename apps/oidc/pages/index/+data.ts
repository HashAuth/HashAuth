import type { PageContextServer } from "vike/types";
import type Provider from "oidc-provider";
import mongoose from "mongoose";
import { render } from "vike/abort";
import { errors } from "oidc-provider";
import * as jose from "jose";

const UserAccount = mongoose.model("UserAccount");

export type Data = Awaited<ReturnType<typeof data>>;

export const data = async (pageContext: PageContextServer) => {};
