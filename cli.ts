// SPDX-FileCopyrightText: 2024 Shota FUJI <pockawoooh@gmail.com>
//
// SPDX-License-Identifier: Apache-2.0

import { black, bold, red, underline } from "./deps/std/fmt/colors.ts";
import { parseArgs } from "./deps/std/cli.ts";

function usageText(exePath: string): string {
	return black(`
${exePath} - Blog generation script.

${bold(underline("USAGE"))}: deno run ${exePath} <COMMAND> [OPTIONS]

${bold(underline("COMMANDS"))}:
  help    Print this message on stdout then exit.
`.trim());
}

/**
 * Run the CLI and returns exit code.
 */
async function run(bin: string, args: readonly string[]): Promise<number> {
	const parsedArgs = parseArgs(args.slice(), {
		boolean: ["--help"],
	});

	const [command] = parsedArgs._;
	if (parsedArgs.help) {
		console.log(usageText(bin));
		return 0;
	}

	if (!command || typeof command !== "string") {
		console.error(usageText(bin));
		console.error(bold(red("\nERROR: COMMAND is required")));
		return 1;
	}

	if (/help/i.test(command)) {
		console.log(usageText(bin));
		return 0;
	}

	console.error(usageText(bin));
	console.error(bold(red(`\nERROR: Unknown COMMAND "${command}"`)));
	return 1;
}

if (import.meta.main) {
	Deno.exit(
		await run(
			// Accessing argv[0] or similar requires broad read permission.
			new URL(import.meta.url).pathname.split("/").slice(-1).join("/"),
			Deno.args,
		),
	);
}
