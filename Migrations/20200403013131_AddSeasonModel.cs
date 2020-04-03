using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;
using System;

namespace pokeleague.Migrations
{
    public partial class AddSeasonModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Seasons",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    SeasonStart = table.Column<DateTime>(nullable: false),
                    SeasonEnd = table.Column<DateTime>(nullable: false),
                    Winner = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Entries", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Seasons",
                columns: new[] { "SeasonStart", "SeasonEnd" },
                values: new object[] { DateTime.Now, DateTime.Now.AddMonths(1) });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Seasons");
        }
    }
}
